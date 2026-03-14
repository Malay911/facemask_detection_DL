"use client";

import { motion } from "framer-motion";

export default function LoadingAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-6 py-10"
        >
            {/* Pulsing ring animation */}
            <div className="relative w-20 h-20">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-neon-blue"
                        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut",
                        }}
                    />
                ))}
                {/* Central icon */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center glow-cyan">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                        />
                    </svg>
                </div>
            </div>

            {/* Animated text */}
            <div className="text-center">
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="font-display text-white/80 font-semibold text-base tracking-wider uppercase"
                >
                    Analyzing Image...
                </motion.p>
                <p className="font-label text-white/30 text-sm mt-1">
                    Running CNN inference
                </p>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                    <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-neon-blue"
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
