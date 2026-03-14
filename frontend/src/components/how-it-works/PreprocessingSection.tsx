"use client";

import { motion } from "framer-motion";
import { ImageIcon, ArrowRight } from "lucide-react";

const steps = [
    { label: "Upload Image", desc: "Input raw image" },
    { label: "Convert to Tensor", desc: "Scale to [0, 1] & H×W×C -> C×H×W" },
    { label: "Image List", desc: "Variable size input list" },
    { label: "FPN Backbone", desc: "ResNet50 feature extraction" },
];

// Simulated pixel grid numbers
const tensorGrid = [
    [0.47, 0.82, 0.13, 0.69, 0.31],
    [0.91, 0.24, 0.56, 0.78, 0.42],
    [0.15, 0.63, 0.88, 0.17, 0.95],
    [0.73, 0.39, 0.52, 0.84, 0.28],
    [0.61, 0.08, 0.71, 0.45, 0.93],
];

export default function PreprocessingSection() {
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
                        1
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Image Preprocessing
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            Preparing raw images for CNN input
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Pipeline steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-5">
                        Processing Pipeline
                    </p>
                    <div className="space-y-0">
                        {steps.map((step, idx) => (
                            <div key={step.label} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + idx * 0.12, type: "spring" }}
                                        className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0"
                                    >
                                        <ImageIcon className="w-4 h-4 text-neon-blue" />
                                    </motion.div>
                                    {idx < steps.length - 1 && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: 28 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + idx * 0.12 }}
                                            className="w-px bg-gradient-to-b from-neon-blue/30 to-transparent"
                                        />
                                    )}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.25 + idx * 0.12 }}
                                    className="pt-2 pb-4"
                                >
                                    <p className="text-sm font-semibold text-white">
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-white/40">{step.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Flow diagram */}
                    <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/5">
                        {["Image", "Matrix", "Tensor"].map((label, idx) => (
                            <div key={label} className="flex items-center gap-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + idx * 0.15 }}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 font-medium"
                                >
                                    {label}
                                </motion.div>
                                {idx < 2 && (
                                    <ArrowRight className="w-3.5 h-3.5 text-white/20" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Animated tensor grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-5">
                        Tensor Visualization
                    </p>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-5 gap-1.5">
                            {tensorGrid.flat().map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.3 + i * 0.04,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                    whileHover={{ scale: 1.15, zIndex: 10 }}
                                    className="w-14 h-14 rounded-lg flex items-center justify-center font-mono text-xs font-bold cursor-default border border-white/5"
                                    style={{
                                        backgroundColor: `rgba(0, 229, 255, ${val * 0.2 + 0.05})`,
                                        color: `rgba(255, 255, 255, ${val * 0.5 + 0.3})`,
                                    }}
                                >
                                    {val.toFixed(2)}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-white/30">
                        <span>Shape: [{">"}0, 3, H, W]</span>
                        <span>·</span>
                        <span>dtype: float32</span>
                        <span>·</span>
                        <span>Range: [0, 1]</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
