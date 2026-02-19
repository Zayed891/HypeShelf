"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/toast";
import { GENRES } from "@/types";

export default function AddRecommendationPage() {
    const createRecommendation = useMutation(api.recommendations.create);
    const router = useRouter();
    const toast = useToast();

    const [formData, setFormData] = useState({
        title: "",
        genre: "Action",
        link: "",
        blurb: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createRecommendation({
                title: formData.title,
                genre: formData.genre,
                link: formData.link,
                blurb: formData.blurb,
            });
            toast("Recommendation posted successfully!", "success");
            router.push("/feed"); // Redirect to feed so user can see their post
        } catch (error: any) {
            console.error("Failed to create recommendation:", error);
            toast(error.message || "Failed to post. Please try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] selection:bg-white/20">
            <Navbar />
            <div className="container-custom pt-32 pb-20">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">Add Recommendation</h1>
                    <p className="text-neutral-400 mb-8">Share what you're hyped about.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                                placeholder="e.g. Inception"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Genre</label>
                            <select
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
                                value={formData.genre}
                                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                            >
                                {GENRES.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Link</label>
                            <input
                                type="url"
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                                placeholder="https://..."
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Short Blurb</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                                placeholder="Why is it worth checking out?"
                                value={formData.blurb}
                                onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full h-12 !bg-white !text-black hover:!bg-neutral-200 font-semibold"
                        >
                            {submitting ? "Posting..." : "Post Recommendation"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
