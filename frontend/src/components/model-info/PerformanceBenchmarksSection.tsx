"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

const benchmarks = [
    { label: "Accuracy", value: 97.60, gradient: "from-neon-blue to-neon-cyan" },
    { label: "Precision", value: 97.64, gradient: "from-neon-cyan to-emerald-500" },
    { label: "Recall", value: 97.60, gradient: "from-emerald-500 to-teal-500" },
    { label: "F1 Score", value: 97.37, gradient: "from-neon-blue to-neon-purple" },
    { label: "ROC-AUC", value: 96.28, gradient: "from-neon-purple to-neon-blue" },
];

export default function PerformanceBenchmarksSection() {
    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center glow-cyan">
                        <Gauge className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Performance Benchmarks
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            Key evaluation metrics
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 space-y-5"
            >
                {benchmarks.map((b, idx) => (
                    <div key={b.label}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white/70">
                                {b.label}
                            </span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="font-display text-sm font-bold text-white"
                            >
                                {b.value}%
                            </motion.span>
                        </div>
                        <div className="h-3 rounded-full bg-white/5 overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${b.value}%` }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1.5,
                                    delay: 0.2 + idx * 0.1,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                                className={`h-full rounded-full bg-gradient-to-r ${b.gradient} relative`}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                            ease: "easeInOut",
                                        }}
                                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
