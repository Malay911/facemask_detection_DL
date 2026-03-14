"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const hyperparams = [
    { key: "batch_size", value: "4", type: "int" },
    { key: "learning_rate", value: "0.0005", type: "float" },
    { key: "optimizer", value: '"Adam"', type: "str" },
    { key: "epochs", value: "20", type: "int" },
    { key: "loss_function", value: '"FastRCNN Loss"', type: "str" },
    { key: "lr_scheduler", value: '"None"', type: "str" },
    { key: "weight_decay", value: "0.0", type: "float" },
    { key: "momentum", value: "N/A", type: "float" },
    { key: "device", value: '"cuda"', type: "str" },
];

export default function HyperparametersSection() {
    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center glow-purple">
                        <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Training Hyperparameters
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            Model configuration
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card overflow-hidden"
            >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] text-white/30 font-mono ml-2">
                        training_config.py
                    </span>
                </div>

                {/* Code content */}
                <div className="p-5 font-mono text-sm space-y-1">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/30"
                    >
                        <span className="text-pink-400">class</span>{" "}
                        <span className="text-amber-300">TrainingConfig</span>
                        <span className="text-white/40">:</span>
                    </motion.div>

                    {hyperparams.map((param, idx) => (
                        <motion.div
                            key={param.key}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 + idx * 0.05 }}
                            className="pl-6 flex items-center gap-0"
                        >
                            <span className="text-neon-blue">{param.key}</span>
                            <span className="text-white/30 mx-1">:</span>
                            <span className="text-neon-purple/50 text-xs mr-1.5">
                                {param.type}
                            </span>
                            <span className="text-white/30 mr-1.5">=</span>
                            <span
                                className={
                                    param.type === "str"
                                        ? "text-emerald-400"
                                        : param.type === "float"
                                            ? "text-amber-300"
                                            : "text-neon-blue"
                                }
                            >
                                {param.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
