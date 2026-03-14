"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScanLine } from "lucide-react";

// 6x6 sample input image grid
const inputGrid = [
    [120, 85, 200, 50, 170, 95],
    [45, 160, 130, 210, 75, 140],
    [190, 55, 100, 180, 110, 65],
    [70, 145, 220, 40, 195, 85],
    [155, 90, 60, 175, 125, 205],
    [80, 210, 150, 115, 185, 45],
];

// 3x3 kernel (edge detection)
const kernel = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
];

function computeConv(grid: number[][], kernel: number[][], row: number, col: number) {
    let sum = 0;
    for (let kr = 0; kr < 3; kr++) {
        for (let kc = 0; kc < 3; kc++) {
            sum += grid[row + kr][col + kc] * kernel[kr][kc];
        }
    }
    return Math.max(0, Math.min(255, Math.round(sum / 8)));
}

export default function ConvolutionSection() {
    const [kernelPos, setKernelPos] = useState({ row: 0, col: 0 });
    const [isAnimating, setIsAnimating] = useState(true);

    // Total positions: 4x4 = 16 (for a 6x6 grid with 3x3 kernel)
    const maxRow = 3;
    const maxCol = 3;

    useEffect(() => {
        if (!isAnimating) return;
        const interval = setInterval(() => {
            setKernelPos((prev) => {
                let nextCol = prev.col + 1;
                let nextRow = prev.row;
                if (nextCol > maxCol) {
                    nextCol = 0;
                    nextRow = prev.row + 1;
                }
                if (nextRow > maxRow) {
                    nextRow = 0;
                    nextCol = 0;
                }
                return { row: nextRow, col: nextCol };
            });
        }, 800);
        return () => clearInterval(interval);
    }, [isAnimating]);

    // Build the output grid
    const outputGrid: number[][] = [];
    for (let r = 0; r <= maxRow; r++) {
        const row: number[] = [];
        for (let c = 0; c <= maxCol; c++) {
            row.push(computeConv(inputGrid, kernel, r, c));
        }
        outputGrid.push(row);
    }

    const currentOutput = computeConv(inputGrid, kernel, kernelPos.row, kernelPos.col);

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
                        2
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Convolution Operation
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            Sliding filter extracts spatial features
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Input grid + kernel overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest">
                            Input Image
                        </p>
                        <button
                            onClick={() => setIsAnimating(!isAnimating)}
                            className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-white/40 hover:text-white/70 transition-colors border border-white/10"
                        >
                            {isAnimating ? "Pause" : "Play"}
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="grid grid-cols-6 gap-1">
                                {inputGrid.flat().map((val, i) => {
                                    const r = Math.floor(i / 6);
                                    const c = i % 6;
                                    const isInKernel =
                                        r >= kernelPos.row &&
                                        r < kernelPos.row + 3 &&
                                        c >= kernelPos.col &&
                                        c < kernelPos.col + 3;
                                    return (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                borderColor: isInKernel
                                                    ? "rgba(0, 229, 255, 0.6)"
                                                    : "rgba(255, 255, 255, 0.05)",
                                                backgroundColor: isInKernel
                                                    ? `rgba(0, 229, 255, ${val / 1000 + 0.1})`
                                                    : `rgba(255, 255, 255, ${val / 1000})`,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="w-11 h-11 rounded-md flex items-center justify-center font-mono text-[10px] text-white/60 border"
                                        >
                                            {val}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Kernel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        3×3 Kernel (Edge Detection)
                    </p>
                    <div className="flex justify-center mb-5">
                        <div className="grid grid-cols-3 gap-1.5">
                            {kernel.flat().map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                                    className={`w-14 h-14 rounded-lg flex items-center justify-center font-mono text-sm font-bold border ${val === 8
                                            ? "bg-neon-blue/15 border-neon-blue/30 text-neon-blue"
                                            : "bg-white/5 border-white/10 text-white/50"
                                        }`}
                                >
                                    {val}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                        <p className="text-xs text-white/40 mb-2 flex items-center gap-1.5">
                            <ScanLine className="w-3.5 h-3.5" />
                            Current output value:
                        </p>
                        <motion.div
                            key={`${kernelPos.row}-${kernelPos.col}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center"
                        >
                            <span className="font-display text-3xl font-black text-neon-blue">
                                {currentOutput}
                            </span>
                            <p className="text-[10px] text-white/30 mt-1">
                                Position [{kernelPos.row}, {kernelPos.col}]
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Output feature map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        Feature Map Output
                    </p>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-4 gap-1.5">
                            {outputGrid.flat().map((val, i) => {
                                const r = Math.floor(i / 4);
                                const c = i % 4;
                                const isCurrent = r === kernelPos.row && c === kernelPos.col;
                                const isPast =
                                    r < kernelPos.row ||
                                    (r === kernelPos.row && c <= kernelPos.col);
                                return (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            backgroundColor: isCurrent
                                                ? "rgba(52, 211, 153, 0.3)"
                                                : isPast
                                                    ? `rgba(52, 211, 153, ${val / 500 + 0.05})`
                                                    : "rgba(255, 255, 255, 0.02)",
                                            borderColor: isCurrent
                                                ? "rgba(52, 211, 153, 0.5)"
                                                : "rgba(255, 255, 255, 0.05)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="w-14 h-14 rounded-lg flex items-center justify-center font-mono text-[10px] border"
                                        style={{
                                            color: isPast
                                                ? "rgba(255,255,255,0.6)"
                                                : "rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        {isPast ? val : "—"}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-white/30 mt-3">
                        Output: 4×4 feature map
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
