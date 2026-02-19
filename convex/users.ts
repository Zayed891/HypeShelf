import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";

/**
 * Syncs the authenticated Clerk user to the Convex `users` table.
 * - Called on every sign-in to keep name/avatar/email up to date.
 * - Auto-promotes the user to `admin` if their email matches the
 *   `ADMIN_EMAIL` environment variable set in the Convex dashboard.
 * - Safe to call multiple times — uses an upsert pattern.
 */
export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return;
        }

        // Check if we've already stored this user
        const user = await ctx.db
            .query("users")
            .withIndex("by_tokenIdentifier", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();

        const name = identity.name || identity.givenName || "Anonymous";
        const email = identity.email;
        const isAdminEmail = email && email === process.env.ADMIN_EMAIL;

        if (user !== null) {
            // Update name, avatar, email if changed
            // Also auto-promote to admin if their email matches ADMIN_EMAIL
            const needsUpdate =
                user.name !== name ||
                user.avatar !== identity.pictureUrl ||
                user.email !== email ||
                (isAdminEmail && user.role !== "admin");

            if (needsUpdate) {
                await ctx.db.patch(user._id, {
                    name: name,
                    avatar: identity.pictureUrl,
                    email: email,
                    ...(isAdminEmail ? { role: "admin" } : {}),
                });
            }
            return;
        }

        // Auto-promote to admin if email matches environment variable
        const role = isAdminEmail ? "admin" : "user";

        await ctx.db.insert("users", {
            tokenIdentifier: identity.subject,
            name: name,
            email: email,
            avatar: identity.pictureUrl,
            role: role,
        });
    },
});

export const getUsers = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        if (!await isAdmin(ctx, identity.subject)) {
            return [];
        }

        return await ctx.db.query("users").collect();
    },
});

export const updateRole = mutation({
    args: { id: v.id("users"), role: v.union(v.literal("admin"), v.literal("user")) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        if (!await isAdmin(ctx, identity.subject)) {
            throw new Error("Unauthorized");
        }

        // Prevent admins from demoting themselves on the backend
        const targetUser = await ctx.db.get(args.id);
        if (!targetUser) throw new Error("User not found");
        if (targetUser.tokenIdentifier === identity.subject && args.role === "user") {
            throw new Error("You cannot demote yourself.");
        }

        await ctx.db.patch(args.id, { role: args.role });
    },
});

export const amIAdmin = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return false;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_tokenIdentifier", (q) =>
                q.eq("tokenIdentifier", identity.subject)
            )
            .unique();

        return user?.role === "admin";
    },
});


// Helper to check if a user is an admin inside other mutations
export async function isAdmin(ctx: QueryCtx, userId: string) {
    const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", userId)
        )
        .unique();

    return user?.role === "admin";
}
