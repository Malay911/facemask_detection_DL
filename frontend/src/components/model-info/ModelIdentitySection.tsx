"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Box, Hash, IterationCw, Binary } from "lucide-react";

const specs = [
    {
        label: "Algorithm",
        value: "Faster R-CNN",
        icon: Brain,
        iconColor: "text-neon-blue",
        iconBg: "bg-neon-blue/10",
    },
    {
        label: "Backbone",
        value: "ResNet50-FPN",
        icon: Cpu,
        iconColor: "text-neon-cyan",
        iconBg: "bg-neon-cyan/10",
    },
    {
        label: "Input Size",
        value: "Variable (min 512px)",
        icon: Box,
        iconColor: "text-neon-purple",
        iconBg: "bg-neon-purple/10",
    },
    {
        label: "Classes",
        value: "3 (With / Without / Incorrect)",
        icon: Hash,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/15",
    },
    {
        label: "Training Epochs",
        value: "20",
        icon: IterationCw,
        iconColor: "text-neon-blue",
        iconBg: "bg-neon-blue/10",
    },
    {
        label: "Parameters",
        value: "25M",
        icon: Binary,
        iconColor: "text-neon-purple",
        iconBg: "bg-neon-purple/10",
    },
];

export default function ModelIdentitySection() {
    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center glow-cyan">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">Model Identity</h2>
                        <p className="font-label text-xs text-white/35">
                            Architecture specifications
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((spec, idx) => {
                    const Icon = spec.icon;
                    return (
                        <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + idx * 0.06 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className="glass-card-hover p-5 relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <div
                                    className={`w-10 h-10 rounded-xl ${spec.iconBg} flex items-center justify-center mb-3`}
                                >
                                    <Icon className={`w-5 h-5 ${spec.iconColor}`} />
                                </div>
                                <p className="font-label text-[10px] text-white/35 uppercase tracking-wider font-medium mb-1">
                                    {spec.label}
                                </p>
                                <p className="font-display text-sm font-bold text-white">
                                    {spec.value}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
