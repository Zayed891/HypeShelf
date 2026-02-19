import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

export function Footer() {
    return (
        <footer className="bg-[#050505]">

            {/* CTA Section */}
            <div className="border border-white/10 mx-3 sm:mx-6 md:mx-8 rounded-xl">
                <div className="py-10 md:py-14 flex flex-col items-center text-center px-5 md:px-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-white/20" />
                        <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Final</span>
                        <div className="h-px w-12 bg-white/20" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight max-w-lg">
                        Start discovering what's worth your time.
                    </h2>
                    <p className="text-neutral-500 text-sm mb-8 max-w-sm">
                        Join the community and share the things you're genuinely hyped about.
                    </p>

                    <SignInButton mode="modal">
                        <button className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-semibold px-8 py-4 rounded-sm hover:bg-white/5 hover:border-white transition-all duration-200 tracking-wide">
                            GET STARTED →
                        </button>
                    </SignInButton>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 text-center sm:text-left">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-white flex items-center justify-center rounded-sm">
                        <div className="h-2.5 w-2.5 bg-black"></div>
                    </div>
                    <span className="font-bold tracking-tight text-white/50 text-sm">HYPESHELF</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 text-neutral-600">
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <span className="text-white/10">|</span>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <span className="text-white/10">|</span>
                    <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                </div>

                {/* Copyright */}
                <p>© 2025 HYPESHELF</p>
            </div>
        </footer>
    );
}
