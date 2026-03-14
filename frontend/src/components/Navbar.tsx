"use client";

import { motion } from "framer-motion";
import { Shield, Home, Scan, Cpu, Workflow } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/#upload", label: "Detection", icon: Scan },
    { href: "/model-info", label: "Model", icon: Cpu },
    { href: "/how-it-works", label: "How It Works", icon: Workflow },
    { href: "https://malay911-facemask-detection.hf.space/docs#/", label: "API Docs", icon: Shield },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        >
            <div className="glass-card flex items-center justify-between w-full max-w-[1320px] mx-3 sm:mx-6 px-4 sm:px-5 py-2.5 mt-3 rounded-2xl border-[rgba(0,229,255,0.1)]">
                {/* Logo + Brand — always visible */}
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center group-hover:shadow-neon transition-shadow duration-300">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <p className="font-display text-sm font-bold text-white leading-none tracking-wider whitespace-nowrap uppercase">
                        MaskGuard
                        <span className="text-neon-blue ml-1">AI</span>
                    </p>
                </Link>

                {/* Nav links — scrollable on medium screens to prevent overflow */}
                <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 ml-auto overflow-x-auto no-scrollbar scroll-smooth pr-1 max-w-[70vw]">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href.replace("/#", "/"));
                        const Icon = link.icon;
                        return (
                            <Link key={link.href} href={link.href}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center gap-1.5 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-[11px] lg:text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                                        ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20 shadow-neon-sm"
                                        : "text-white/40 hover:text-neon-blue/80 hover:bg-white/[0.03]"
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {link.label}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </motion.header>
    );
}
