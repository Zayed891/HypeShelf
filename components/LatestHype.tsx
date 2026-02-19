"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationCard } from "./RecommendationCard";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function LatestHype() {
    const { isSignedIn, isLoaded } = useUser();
    const recent = useQuery(api.recommendations.getRecent);

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return (
            <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-6">Latest Hype</h2>
                {/* Blurred preview */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none pointer-events-none blur-sm opacity-40">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 h-48" />
                        ))}
                    </div>
                    {/* CTA overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <p className="text-white font-semibold text-lg">Sign in to see what's being hyped</p>
                        <SignInButton mode="modal">
                            <Button className="h-10 px-6 bg-white text-black hover:bg-neutral-200 font-semibold">
                                Sign In to Browse →
                            </Button>
                        </SignInButton>
                    </div>
                </div>
            </div>
        );
    }

    if (!recent) return <div className="text-neutral-500">Loading recommendations...</div>;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white mb-6">Latest Hype</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.map((rec) => (
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
            {recent.length === 0 && <p className="text-neutral-500">No hype yet. Be the first!</p>}
        </div>
    );
}
