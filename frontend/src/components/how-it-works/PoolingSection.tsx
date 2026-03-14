"use client";

import { motion } from "framer-motion";
import { Minimize2 } from "lucide-react";

const inputGrid = [
    [4.2, 0.0, 3.6, 1.2],
    [0.6, 0.0, 0.0, 2.3],
    [0.0, 1.1, 0.5, 0.0],
    [3.4, 0.0, 0.0, 3.8],
];

// Max pooling with 2x2 window
const outputGrid = [
    [4.2, 3.6],
    [3.4, 3.8],
];

const poolingWindows = [
    { rows: [0, 1], cols: [0, 1], max: 4.2, maxPos: [0, 0] },
    { rows: [0, 1], cols: [2, 3], max: 3.6, maxPos: [0, 2] },
    { rows: [2, 3], cols: [0, 1], max: 3.4, maxPos: [3, 0] },
    { rows: [2, 3], cols: [2, 3], max: 3.8, maxPos: [3, 3] },
];

export default function PoolingSection() {
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
                        4
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Max Pooling Layer
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            2×2 window reduces spatial dimensions
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        Input (4×4)
                    </p>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-4 gap-1.5">
                            {inputGrid.flat().map((val, i) => {
                                const r = Math.floor(i / 4);
                                const c = i % 4;
                                const isMax = poolingWindows.some(
                                    (w) => w.maxPos[0] === r && w.maxPos[1] === c
                                );
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.04, type: "spring" }}
                                        className={`w-14 h-14 rounded-lg flex items-center justify-center font-mono text-xs font-bold border ${isMax
                                                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/20"
                                                : val === 0
                                                    ? "bg-white/[0.02] border-white/5 text-white/20"
                                                    : "bg-white/5 border-white/10 text-white/50"
                                            }`}
                                    >
                                        {val.toFixed(1)}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-white/30 mt-3">
                        <span className="text-emerald-400">■</span> Maximum values per window
                    </p>
                </motion.div>

                {/* Arrow / Explanation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 flex flex-col items-center justify-center"
                >
                    <Minimize2 className="w-8 h-8 text-emerald-400 mb-4" />
                    <p className="font-display text-sm font-semibold text-white mb-2 text-center tracking-wider uppercase">
                        Max Pooling 2×2
                    </p>
                    <p className="text-xs text-white/40 text-center leading-relaxed mb-4">
                        Selects the maximum value from each 2×2 window, reducing
                        spatial dimensions by half while preserving dominant features.
                    </p>
                    <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.03] border border-white/5">
                            <span className="text-white/40">Dimension Reduction</span>
                            <span className="text-emerald-400 font-mono font-bold">
                                4×4 → 2×2
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.03] border border-white/5">
                            <span className="text-white/40">Stride</span>
                            <span className="text-neon-blue font-mono font-bold">2</span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.03] border border-white/5">
                            <span className="text-white/40">Feature Compression</span>
                            <span className="text-amber-400 font-mono font-bold">75%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Output */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        Output (2×2)
                    </p>
                    <div className="flex justify-center items-center h-[calc(100%-4rem)]">
                        <div className="grid grid-cols-2 gap-2">
                            {outputGrid.flat().map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.6 + i * 0.15,
                                        type: "spring",
                                        stiffness: 150,
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center font-mono text-lg font-black text-emerald-300 cursor-default"
                                >
                                    {val.toFixed(1)}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
