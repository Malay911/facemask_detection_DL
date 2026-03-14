"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, TrendingUp } from "lucide-react";
import Image from "next/image";
import { PredictionResponse } from "@/types/prediction";

interface PredictionResultProps {
    result: PredictionResponse;
    imagePreview: string;
}

export default function PredictionResult({
    result,
    imagePreview,
}: PredictionResultProps) {
    const isWithMask = result.prediction === "With Mask";
    const confidencePct = Math.round(result.confidence * 100);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Image preview card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-4 flex flex-col gap-3"
                >
                    <p className="font-label text-xs font-bold text-white/40 uppercase tracking-widest">
                        Uploaded Image
                    </p>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-neon-blue/10">
                        <Image
                            src={imagePreview}
                            alt="Uploaded face"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay badge */}
                        <div
                            className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm ${isWithMask
                                    ? "bg-emerald-500/90 text-white glow-green"
                                    : "bg-red-500/90 text-white glow-red"
                                }`}
                        >
                            {isWithMask ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                                <XCircle className="w-3.5 h-3.5" />
                            )}
                            {result.prediction}
                        </div>
                    </div>
                </motion.div>

                {/* Result details card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6 flex flex-col justify-between gap-6"
                >
                    {/* Verdict */}
                    <div>
                        <p className="font-label text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                            Detection Result
                        </p>

                        {/* Status icon + label */}
                        <div className="flex items-center gap-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${isWithMask
                                        ? "bg-emerald-500/15 glow-green"
                                        : "bg-red-500/15 glow-red"
                                    }`}
                            >
                                {isWithMask ? (
                                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                                ) : (
                                    <XCircle className="w-7 h-7 text-red-400" />
                                )}
                            </motion.div>
                            <div>
                                <p className="font-display text-xl font-black text-white tracking-wide">{result.prediction}</p>
                                <p
                                    className={`font-label text-sm font-semibold ${isWithMask ? "text-emerald-400" : "text-red-400"
                                        }`}
                                >
                                    {isWithMask ? "✓ Compliant" : "✗ Non-Compliant"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Confidence meter */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-4 h-4 text-neon-blue/40" />
                                <p className="font-label text-sm font-medium text-white/50">Confidence</p>
                            </div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="font-display text-2xl font-black text-white"
                            >
                                {confidencePct}%
                            </motion.span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${confidencePct}%` }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                className={`h-full rounded-full ${isWithMask
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                                        : "bg-gradient-to-r from-red-500 to-orange-400"
                                    }`}
                            />
                        </div>

                        {/* Calibration ticks */}
                        <div className="flex justify-between mt-1.5 px-0.5">
                            {["0%", "25%", "50%", "75%", "100%"].map((t) => (
                                <span key={t} className="text-[10px] text-white/20 font-label">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Warning for no mask */}
                    {!isWithMask && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-start gap-3 p-3 rounded-xl bg-red-500/8 border border-red-500/20 glow-red"
                        >
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-red-300 leading-relaxed">
                                Face mask not detected. Please wear a mask to comply with safety regulations.
                            </p>
                        </motion.div>
                    )}

                    {isWithMask && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20"
                        >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <p className="text-xs text-emerald-300 leading-relaxed">
                                Face mask detected. Thank you for following safety guidelines.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
