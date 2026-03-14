"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreprocessingSection from "@/components/how-it-works/PreprocessingSection";
import ConvolutionSection from "@/components/how-it-works/ConvolutionSection";
import ActivationSection from "@/components/how-it-works/ActivationSection";
import PoolingSection from "@/components/how-it-works/PoolingSection";
import FullyConnectedSection from "@/components/how-it-works/FullyConnectedSection";
import PredictionSection from "@/components/how-it-works/PredictionSection";

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-28 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center glow-cyan">
                                    <Cpu className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">How It Works</h1>
                                    <p className="font-label text-xs text-white/35 mt-0.5">Interactive CNN Pipeline Simulation</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm cursor-pointer">
                                <ArrowLeft className="w-4 h-4" />Back to Home
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Pipeline overview */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="glass-card p-4 mb-10 flex flex-wrap items-center justify-center gap-2">
                        {["Preprocessing", "Convolution", "ReLU", "Pooling", "FC Layer", "Prediction"].map((step, i) => (
                            <div key={step} className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-neon-blue/10">
                                    <span className="w-5 h-5 rounded-md bg-gradient-to-br from-neon-blue/50 to-neon-purple/50 flex items-center justify-center text-[10px] font-bold text-white font-display">{i + 1}</span>
                                    <span className="font-label text-xs text-white/50 font-semibold">{step}</span>
                                </div>
                                {i < 5 && <span className="text-neon-blue/15 text-xs">→</span>}
                            </div>
                        ))}
                    </motion.div>

                    <div className="space-y-14">
                        <PreprocessingSection />
                        <ConvolutionSection />
                        <ActivationSection />
                        <PoolingSection />
                        <FullyConnectedSection />
                        <PredictionSection />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
