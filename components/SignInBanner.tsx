"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function SignInBanner() {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded || isSignedIn) return null;

    return (
        <section className="py-20 border-t border-neutral-200 bg-white">
            <div className="container-custom flex flex-col items-center text-center gap-6">
                {/* Decorative line */}
                <div className="flex items-center gap-4 w-full max-w-xs">
                    <div className="flex-1 h-px bg-black/10" />
                    <span className="text-black/30 text-xs font-bold tracking-widest">HYPE INSIDE</span>
                    <div className="flex-1 h-px bg-black/10" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                    Sign in to see<br />
                    <span className="text-neutral-500">the latest hypes</span>
                </h2>
                <p className="text-neutral-500 text-sm max-w-md">
                    Join the community to discover hand-picked movies, books, tools, and more — recommended by real people.
                </p>

                <SignInButton mode="modal">
                    <Button className="h-12 px-8 !bg-black !text-white hover:!bg-neutral-800 font-semibold text-sm tracking-wide">
                        SIGN IN TO BROWSE →
                    </Button>
                </SignInButton>
            </div>
        </section>
    );
}
