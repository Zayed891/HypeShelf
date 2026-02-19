"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationCard } from "./RecommendationCard";
import { useState } from "react";

export function DashboardFeed() {
    const [genre, setGenre] = useState<string>("All");
    const [staffPick, setStaffPick] = useState<boolean>(false);

    const all = useQuery(api.recommendations.getAll, {
        genre: genre === "All" ? undefined : genre,
        staffPicked: staffPick ? true : undefined,
    });

    if (!all) return <div className="text-neutral-500">Loading your feed...</div>;

    const genres = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Documentary", "Other"];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-white">All Hype</h2>

                <div className="flex items-center gap-4">
                    <select
                        className="bg-neutral-900 border border-neutral-800 text-white text-sm rounded px-3 py-2 focus:outline-none"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        {genres.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>

                    <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={staffPick}
                            onChange={(e) => setStaffPick(e.target.checked)}
                            className="accent-white"
                        />
                        Staff Picks Only
                    </label>
                </div>
            </div>

            {all.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center mb-6">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Nothing here yet</h3>
                    <p className="text-neutral-500 text-sm max-w-xs">
                        {staffPick || genre !== "All"
                            ? "No recommendations match your current filters. Try adjusting them."
                            : "Be the first to share something worth hyping. Hit + Add Yours!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {all.map((rec) => (
                        <RecommendationCard
                            key={rec._id}
                            id={rec._id}
                            title={rec.title}
                            genre={rec.genre}
                            link={rec.link}
                            blurb={rec.blurb}
                            userId={rec.userId}
                            authorName={rec.authorName}
                            authorAvatar={rec.authorAvatar}
                            isStaffPick={rec.isStaffPick}
                            creationTime={rec._creationTime}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

