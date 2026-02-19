"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function Navbar() {
    const { isSignedIn } = useUser();
    const amIAdmin = useQuery(api.users.amIAdmin);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
            <div className="container-custom h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-white flex items-center justify-center rounded-sm">
                        <div className="h-4 w-4 bg-black"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">HYPESHELF</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4">
                    {isSignedIn ? (
                        <>
                            {amIAdmin && (
                                <Link
                                    href="/admin"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-widest text-white border border-white/30 rounded-sm hover:border-white hover:bg-white/5 transition-all duration-200"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                                    ADMIN
                                </Link>
                            )}
                            <Link href="/feed" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                BROWSE HYPE
                            </Link>
                            <Link href="/add">
                                <Button className="bg-neutral-800 text-black hover:bg-neutral-700 border border-neutral-700">
                                    + ADD YOURS
                                </Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                </div>

                {/* Mobile right side */}
                <div className="flex md:hidden items-center gap-3">
                    {isSignedIn && <UserButton afterSignOutUrl="/" />}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white p-1"
                        aria-label="Toggle menu"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {menuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden border-t border-white/10 bg-[#050505] px-6 py-4 flex flex-col gap-4">
                    {isSignedIn ? (
                        <>
                            {amIAdmin && (
                                <Link href="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-bold tracking-widest text-white">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                                    ADMIN
                                </Link>
                            )}
                            <Link href="/feed" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-300 hover:text-white">
                                BROWSE HYPE
                            </Link>
                            <Link href="/add" onClick={() => setMenuOpen(false)}>
                                <Button className="w-full bg-neutral-800 text-black border border-neutral-700">
                                    + ADD YOURS
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10">
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                </div>
            )}
        </nav>
    );
}
