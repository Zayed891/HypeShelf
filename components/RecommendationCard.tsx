"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface RecommendationProps {
    id: Id<"recommendations">;
    title: string;
    genre: string;
    link: string;
    blurb: string;
    userId: string;
    authorName?: string;
    authorAvatar?: string;
    isStaffPick: boolean;
    creationTime: number;
}

export function RecommendationCard({
    id,
    title,
    genre,
    link,
    blurb,
    userId,
    authorName,
    authorAvatar,
    isStaffPick,
    creationTime,
}: RecommendationProps) {
    const { user } = useUser();
    const deleteRecommendation = useMutation(api.recommendations.deleteRecommendation);
    const toggleStaffPick = useMutation(api.recommendations.toggleStaffPick);

    // Basic admin check logic in frontend (also enforced in backend)
    // In real app, maybe fetch a query "getMyRole" or similar. 
    // Here we check against env var exposed to public? No, process.env is not exposed unless NEXT_PUBLIC.
    // We can't easily check admin status in frontend securely without a query. 
    // But for UI visibility we can check if the backend allows it or just try.
    // Let's assume we can see buttons if we are the owner.
    // For admin, we might need a helper query `isAdmin` or just rely on backend throwing error? 
    // Better UI: let's blindly show delete if (user.id === userId). 
    // For Staff Pick: limit to known admin ID or just hide it? 
    // Since we don't have a secure "Am I Admin" query, I'll skip showing admin buttons unless I implement `amIAdmin` query.
    // Actually, I can just implement `amIAdmin` query quickly. 
    // But for now, let's just show Delete if user is owner.

    const isOwner = user?.id === userId;
    const isAdmin = useQuery(api.recommendations.amIAdmin) || false;

    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteRecommendation({ id });
        } catch (e) {
            alert("Failed to delete");
        }
    }

    const handleToggleStaffPick = async () => {
        try {
            await toggleStaffPick({ id, isStaffPick: !isStaffPick });
        } catch (e) {
            alert("Failed to toggle staff pick");
        }
    }

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors relative group">
            {isStaffPick && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                    STAFF PICK
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="inline-block px-2 py-1 bg-neutral-800 text-neutral-400 text-xs font-medium rounded mb-2">
                        {genre}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-neutral-500 underline-offset-4">
                            {title}
                        </a>
                    </h3>
                </div>
            </div>

            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                {blurb}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2">
                    {authorAvatar && (
                        <img src={authorAvatar} alt={authorName} className="w-5 h-5 rounded-full" />
                    )}
                    <span className="text-xs text-neutral-500">
                        {authorName || "Anonymous"} • {new Date(creationTime).toLocaleDateString()}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {(isOwner || isAdmin) && (
                        <button
                            onClick={handleDelete}
                            className="text-xs text-red-500 hover:text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            DELETE
                        </button>
                    )}

                    {isAdmin && (
                        <button
                            onClick={handleToggleStaffPick}
                            className="text-xs text-yellow-500 hover:text-yellow-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {isStaffPick ? "UNPICK" : "PICK"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
