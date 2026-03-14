"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, ShieldAlert, AlertTriangle, ShieldX } from "lucide-react";
import { DetectionResponse } from "@/types/prediction";

interface DetectionResultProps {
    result: DetectionResponse;
}

export default function DetectionResult({ result }: DetectionResultProps) {
    const { faces_detected, results, annotated_image } = result;

    const withMaskCount = results.filter((r) => r.label === "With Mask").length;
    const withoutMaskCount = results.filter((r) => r.label === "Without Mask").length;
    const incorrectMaskCount = results.filter((r) => r.label === "Incorrect Mask").length;

    // Only with_mask is fully compliant
    const compliancePct = faces_detected > 0
        ? Math.round((withMaskCount / faces_detected) * 100)
        : 0;

    const nonCompliantCount = withoutMaskCount + incorrectMaskCount;

    return (
        <div className="flex flex-col gap-6">
            {/* Annotated Image */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden glass-card relative group"
            >
                <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-neon-blue/15 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-neon-blue/70" />
                    <span className="font-label text-xs font-semibold text-white">
                        {faces_detected} {faces_detected === 1 ? 'face' : 'faces'} detected
                    </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={annotated_image}
                    alt="Detection Result"
                    className="w-full h-auto object-contain bg-black/50"
                />
            </motion.div>

            {faces_detected > 0 && (
                <>
                    {/* Summary Stats Cards — 3 columns for 3 classes */}
                    <div className="grid grid-cols-3 gap-3">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-4 relative overflow-hidden group hover:border-emerald-500/20 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="flex items-center gap-2 mb-2 relative z-10">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <span className="font-display text-2xl font-bold text-white tracking-tight">
                                    {withMaskCount}
                                </span>
                            </div>
                            <p className="font-label text-xs text-white/50 font-semibold uppercase tracking-wider relative z-10">With Mask</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-4 relative overflow-hidden group hover:border-orange-500/20 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-yellow-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="flex items-center gap-2 mb-2 relative z-10">
                                <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                                    <ShieldX className="w-3.5 h-3.5 text-orange-400" />
                                </div>
                                <span className="font-display text-2xl font-bold text-white tracking-tight">
                                    {incorrectMaskCount}
                                </span>
                            </div>
                            <p className="font-label text-xs text-white/50 font-semibold uppercase tracking-wider relative z-10">Incorrect</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="glass-card p-4 relative overflow-hidden group hover:border-red-500/20 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/8 to-orange-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="flex items-center gap-2 mb-2 relative z-10">
                                <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
                                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                                </div>
                                <span className="font-display text-2xl font-bold text-white tracking-tight">
                                    {withoutMaskCount}
                                </span>
                            </div>
                            <p className="font-label text-xs text-white/50 font-semibold uppercase tracking-wider relative z-10">No Mask</p>
                        </motion.div>
                    </div>

                    {/* Compliance Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-5"
                    >
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <h3 className="font-display text-xs font-medium text-white mb-0.5 tracking-wider uppercase">Compliance Rate</h3>
                                <p className="text-xs text-white/35">Overall safety metric</p>
                            </div>
                            <span className="font-display text-2xl font-black text-white">{compliancePct}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${compliancePct}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                                className={`absolute top-0 left-0 h-full rounded-full ${compliancePct === 100
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-400 glow-green"
                                        : compliancePct >= 50
                                            ? "bg-gradient-to-r from-amber-400 to-yellow-400"
                                            : "bg-gradient-to-r from-red-500 to-orange-400 glow-red"
                                    }`}
                            />
                        </div>
                    </motion.div>

                    {/* Warning banner */}
                    {nonCompliantCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="p-4 rounded-xl bg-red-500/8 border border-red-500/20 flex gap-3 glow-red"
                        >
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-label text-sm font-bold text-red-200 mb-1">
                                    Non-Compliance Detected
                                </h4>
                                <p className="text-xs text-red-300">
                                    {nonCompliantCount} {nonCompliantCount === 1 ? 'person requires' : 'people require'} a properly worn mask.
                                    {incorrectMaskCount > 0 && ` (${incorrectMaskCount} wearing incorrectly)`}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
}
