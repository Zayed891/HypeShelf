import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isAdmin } from "./users";


export const amIAdmin = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;
        return isAdmin(ctx, identity.subject);
    },
});

// Public: Get last 10 recommendations
export const getRecent = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("recommendations")
            .order("desc")
            .take(10);
    },
});

// Authenticated: Get all recommendations, optionally filtered
export const getAll = query({
    args: {
        genre: v.optional(v.string()),
        staffPicked: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            // Return empty or throw? Requirement says "Authenticated experience... Show: List of all recs"
            // If public page shows only small list, maybe this throws or returns empty.
            return [];
        }

        let q = ctx.db.query("recommendations").order("desc");

        // Note: Filtering in Convex is done after query or using index.
        // For simplicity with small data, filter in memory or use .filter()

        // Applying .filter()
        if (args.genre) {
            q = q.filter((q) => q.eq(q.field("genre"), args.genre));
        }

        if (args.staffPicked) {
            q = q.filter((q) => q.eq(q.field("isStaffPick"), true));
        }

        return await q.collect();
    },
});

/**
 * Creates a new recommendation.
 * Rate-limited to 10 posts per hour per user to prevent spam.
 */
export const create = mutation({
    args: {
        title: v.string(),
        genre: v.string(),
        link: v.string(),
        blurb: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        // Rate limit: no more than 10 posts per hour per user
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        const recentPosts = await ctx.db
            .query("recommendations")
            .filter((q) =>
                q.and(
                    q.eq(q.field("userId"), identity.subject),
                    q.gt(q.field("_creationTime"), oneHourAgo)
                )
            )
            .collect();

        if (recentPosts.length >= 10) {
            throw new Error("Rate limit: You can only post 10 recommendations per hour.");
        }

        await ctx.db.insert("recommendations", {
            title: args.title,
            genre: args.genre,
            link: args.link,
            blurb: args.blurb,
            userId: identity.subject,
            authorName: identity.name || identity.givenName || "Anonymous",
            authorAvatar: identity.pictureUrl,
            isStaffPick: false,
        });
    },
});

// Authenticated: Delete (Owner or Admin)
export const deleteRecommendation = mutation({
    args: { id: v.id("recommendations") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const rec = await ctx.db.get(args.id);
        if (!rec) {
            throw new Error("Recommendation not found");
        }

        const isOwner = rec.userId === identity.subject;
        const admin = await isAdmin(ctx, identity.subject);

        if (!isOwner && !admin) {
            throw new Error("Unauthorized: You can only delete your own posts.");
        }

        await ctx.db.delete(args.id);
    },
});

// Admin: Toggle Staff Pick
export const toggleStaffPick = mutation({
    args: { id: v.id("recommendations"), isStaffPick: v.boolean() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const isUserAdmin = await isAdmin(ctx, identity.subject);
        if (!isUserAdmin) {
            throw new Error("Unauthorized: Admins only.");
        }

        await ctx.db.patch(args.id, { isStaffPick: args.isStaffPick });
    },
});
