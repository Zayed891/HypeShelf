"use client";

import { Navbar } from "@/components/Navbar";
import { DashboardFeed } from "@/components/DashboardFeed";

export default function FeedPage() {
    return (
        <div className="min-h-screen bg-[#050505] selection:bg-white/20">
            <Navbar />
            <div className="container-custom pt-32 pb-20">
                <DashboardFeed />
            </div>
        </div>
    );
}
