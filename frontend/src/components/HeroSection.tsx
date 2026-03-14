"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background animated elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/8 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-neon-cyan/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-blue/5 border border-neon-blue/15 text-xs font-medium text-neon-blue/80 mb-8 backdrop-blur-sm"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        System v2.0 Online
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-4xl md:text-6xl font-black text-white tracking-wide mb-6 leading-[1.1] uppercase"
                    >
                        Real-Time Face Mask Detection{" "}
                        <span className="gradient-text inline-block">Powered by AI</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base md:text-lg text-white/45 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Upload images and instantly detect mask compliance using our state-of-the-art
                        deep learning computer vision models. Ensure safety protocols with precision.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="#upload" className="w-full sm:w-auto">
                            <button className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 group text-sm">
                                Start Detection
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/how-it-works" className="w-full sm:w-auto">
                            <button className="btn-secondary w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                                How It Works
                            </button>
                        </Link>
                    </motion.div>

                    {/* Features row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-20 pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6"
                    >
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-11 h-11 rounded-full bg-neon-blue/10 flex items-center justify-center mb-3 text-neon-blue group-hover:shadow-neon-sm transition-shadow duration-300">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="font-display text-xs font-semibold text-white mb-1 tracking-wider uppercase">Lightning Fast</h3>
                            <p className="text-xs text-white/35">Inference under 100ms per image</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-11 h-11 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 text-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-shadow duration-300">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-display text-xs font-semibold text-white mb-1 tracking-wider uppercase">High Accuracy</h3>
                            <p className="text-xs text-white/35">Robust multi-scale detection</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-11 h-11 rounded-full bg-neon-purple/10 flex items-center justify-center mb-3 text-neon-purple group-hover:shadow-[0_0_15px_rgba(122,95,255,0.2)] transition-shadow duration-300">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="font-display text-xs font-semibold text-white mb-1 tracking-wider uppercase">Privacy First</h3>
                            <p className="text-xs text-white/35">Images processed without storage</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
