import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    recommendations: defineTable({
        title: v.string(),
        genre: v.string(), // e.g., "horror", "action", "comedy"
        link: v.string(),
        blurb: v.string(),
        userId: v.string(), // Clerk user ID
        authorName: v.optional(v.string()),
        authorAvatar: v.optional(v.string()),
        isStaffPick: v.boolean(),
    })
        .index("by_userId", ["userId"]),

    users: defineTable({
        tokenIdentifier: v.string(), // Clerk user ID
        name: v.string(),
        email: v.optional(v.string()),
        avatar: v.optional(v.string()),
        role: v.union(v.literal("admin"), v.literal("user")),
    })
        .index("by_tokenIdentifier", ["tokenIdentifier"]),
});
