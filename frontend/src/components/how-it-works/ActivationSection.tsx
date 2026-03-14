"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const values = [
    [2.5, -1.3, 0.8, -3.1, 1.7, -0.4],
    [-2.1, 3.6, -0.9, 1.2, -4.5, 0.3],
    [0.6, -1.8, 4.2, -0.7, 2.3, -2.9],
    [-3.4, 1.1, -2.6, 0.5, -1.5, 3.8],
];

export default function ActivationSection() {
    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple text-white text-sm font-black font-display">
                        3
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Activation Function (ReLU)
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            Non-linearity: max(0, x)
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Before ReLU */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        Before ReLU
                    </p>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-6 gap-1.5">
                            {values.flat().map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, rotateX: 90 }}
                                    whileInView={{ opacity: 1, rotateX: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.03 }}
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold border ${val < 0
                                            ? "bg-red-500/15 border-red-500/20 text-red-400"
                                            : "bg-emerald-500/15 border-emerald-500/20 text-emerald-400"
                                        }`}
                                >
                                    {val.toFixed(1)}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-white/30">
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" /> Negative
                        </span>
                        <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50" /> Positive
                        </span>
                    </div>
                </motion.div>

                {/* After ReLU */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest">
                            After ReLU
                        </p>
                        <div className="flex items-center gap-1.5 text-neon-blue">
                            <Zap className="w-3.5 h-3.5" />
                            <span className="font-label text-[10px] font-semibold">f(x) = max(0, x)</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-6 gap-1.5">
                            {values.flat().map((val, i) => {
                                const relu = Math.max(0, val);
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.04, type: "spring" }}
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold border ${relu === 0
                                                ? "bg-white/[0.02] border-white/5 text-white/20"
                                                : "bg-emerald-500/15 border-emerald-500/20 text-emerald-400"
                                            }`}
                                    >
                                        {relu.toFixed(1)}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-white/30 mt-4">
                        All negative values → 0 · Positive values unchanged
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
