import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-neon-blue/5 bg-black/30 mt-20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 opacity-60">
                        <Shield className="w-4 h-4 text-neon-blue/60" />
                        <span className="font-display text-sm font-semibold tracking-wider uppercase">
                            MaskGuard
                            <span className="text-neon-blue ml-1">AI</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-white/35 flex-wrap justify-center">
                        <Link href="/" className="hover:text-neon-blue transition-colors duration-300">
                            Home
                        </Link>
                        <Link href="/dashboard" className="hover:text-neon-blue transition-colors duration-300">
                            Analytics
                        </Link>
                        <Link href="/data-insights" className="hover:text-neon-blue transition-colors duration-300">
                            Data Insights
                        </Link>
                        <Link href="/model-info" className="hover:text-neon-blue transition-colors duration-300">
                            Model Info
                        </Link>
                        <Link href="/how-it-works" className="hover:text-neon-blue transition-colors duration-300">
                            How It Works
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-white/25">
                    &copy; {new Date().getFullYear()} MaskGuard AI Systems. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
