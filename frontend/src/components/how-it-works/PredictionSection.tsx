"use client";

import { motion } from "framer-motion";
import { Target, ShieldCheck, ShieldX, ShieldAlert } from "lucide-react";

export default function PredictionSection() {
    return (
        <section>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple text-white text-sm font-black font-display">6</div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">Final Prediction</h2>
                        <p className="font-label text-xs text-white/35">Softmax output and Faster R-CNN classification result</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Output neurons */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-6">
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-6">Output Layer — 3 Classes (+ Bg)</p>

                    {/* With Mask */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}
                                className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center glow-green">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            </motion.div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-white">With Mask</span>
                                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                                        className="text-lg font-black text-emerald-400">89%</motion.span>
                                </div>
                                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "89%" }} viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 relative overflow-hidden">
                                        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                                            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Without Mask */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }}
                                className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                                <ShieldX className="w-6 h-6 text-red-400" />
                            </motion.div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-white">Without Mask</span>
                                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
                                        className="text-lg font-black text-red-400">8%</motion.span>
                                </div>
                                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "8%" }} viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Incorrect Mask */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring" }}
                                className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                                <ShieldAlert className="w-6 h-6 text-amber-400" />
                            </motion.div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-white">Incorrect Mask</span>
                                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
                                        className="text-lg font-black text-amber-400">3%</motion.span>
                                </div>
                                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "3%" }} viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Result card */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                    <div className="relative z-10 text-center">
                        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring", stiffness: 150 }}>
                            <Target className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                        </motion.div>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                            className="text-xs text-white/35 uppercase tracking-widest mb-2">Highest Confidence Pick</motion.p>
                        <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
                            className="font-display text-3xl font-black text-white mb-2 tracking-wider">With Mask ✓</motion.h3>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
                            className="text-sm text-emerald-400 font-semibold mb-4">Confidence: 89.2%</motion.p>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-400">Compliant</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.0 }}
                            className="mt-6 grid grid-cols-2 gap-3 text-[10px]">
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 relative">
                                <span className="text-white/30">Inference</span>
                                <p className="text-white/60 font-mono font-bold">~180ms</p>
                            </div>
                            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 relative">
                                <span className="text-white/30">Model</span>
                                <p className="text-white/60 font-mono font-bold">Faster R-CNN</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
