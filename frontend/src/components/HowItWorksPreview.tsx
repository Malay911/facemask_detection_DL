"use client";

import { motion } from "framer-motion";
import { Cpu, ArrowRight, Layers, Zap, Target } from "lucide-react";
import Link from "next/link";

const pipelineSteps = [
    { icon: Layers, label: "Preprocessing", color: "text-neon-blue", bg: "bg-neon-blue/10" },
    { icon: Cpu, label: "Convolution", color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
    { icon: Zap, label: "Activation", color: "text-neon-purple", bg: "bg-neon-purple/10" },
    { icon: Target, label: "Prediction", color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

export default function HowItWorksPreview() {
    return (
        <section className="py-20 px-4 relative">
            <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-blue/8 border border-neon-blue/15 text-xs font-medium text-neon-blue mb-4">
                        <Cpu className="w-3.5 h-3.5" />CNN Visual Simulation
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3 tracking-wider uppercase">
                        How Does the <span className="gradient-text">AI Model</span> Work?
                    </h2>
                    <p className="text-sm text-white/35 max-w-lg mx-auto">
                        Explore an interactive simulation of how our Convolutional Neural Network
                        processes images to detect face masks in real-time.
                    </p>
                </motion.div>

                {/* Pipeline mini preview */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                    className="glass-card p-6 max-w-2xl mx-auto mb-8">
                    <div className="flex items-center justify-around">
                        {pipelineSteps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.label} className="flex items-center gap-3">
                                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                                        className="flex flex-col items-center gap-1.5">
                                        <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center`}>
                                            <Icon className={`w-5 h-5 ${step.color}`} />
                                        </div>
                                        <span className="font-label text-[10px] text-white/40 font-semibold">{step.label}</span>
                                    </motion.div>
                                    {i < pipelineSteps.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-neon-blue/15 mb-5" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    className="text-center">
                    <Link href="/how-it-works">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 mx-auto group">
                            Explore Model Simulation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
