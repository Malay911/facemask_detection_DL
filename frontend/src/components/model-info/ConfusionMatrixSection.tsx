"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3 } from "lucide-react";

// Simulated 3x3 confusion matrix data
const matrixData = {
    c11: { value: 3143, row: "With Mask", col: "With Mask", desc: "Correctly identified as With Mask", color: "emerald", label: "True Positive" },
    c12: { value: 12, row: "With Mask", col: "No Mask", desc: "With Mask mistaken for No Mask", color: "rose", label: "False Negative" },
    c13: { value: 1, row: "With Mask", col: "Incorrect", desc: "With Mask mistaken for Incorrect", color: "amber", label: "False Negative" },
    
    c21: { value: 8, row: "No Mask", col: "With Mask", desc: "No Mask mistaken for With Mask", color: "rose", label: "False Positive" },
    c22: { value: 686, row: "No Mask", col: "No Mask", desc: "Correctly identified as No Mask", color: "blue", label: "True Negative" },
    c23: { value: 0, row: "No Mask", col: "Incorrect", desc: "No Mask mistaken for Incorrect", color: "amber", label: "False Positive" },
    
    c31: { value: 46, row: "Incorrect", col: "With Mask", desc: "Incorrect mistaken for With Mask", color: "rose", label: "False Positive" },
    c32: { value: 30, row: "Incorrect", col: "No Mask", desc: "Incorrect mistaken for No Mask", color: "amber", label: "False Positive" },
    c33: { value: 108, row: "Incorrect", col: "Incorrect", desc: "Correctly identified as Incorrect", color: "violet", label: "True Positive" },
};

type CellKey = keyof typeof matrixData;

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    emerald: { bg: "bg-emerald-500/15", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "shadow-amber-500/20" },
    rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", glow: "shadow-rose-500/20" },
    blue: { bg: "bg-blue-500/15", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-blue-500/20" },
    violet: { bg: "bg-violet-500/15", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-violet-500/20" },
};

export default function ConfusionMatrixSection() {
    const [hoveredCell, setHoveredCell] = useState<CellKey | null>(null);

    const rows = [
        ["c11", "c12", "c13"],
        ["c21", "c22", "c23"],
        ["c31", "c32", "c33"],
    ] as CellKey[][];

    const activeCell = hoveredCell ? matrixData[hoveredCell] : null;

    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center glow-cyan">
                        <Grid3X3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Confusion Matrix
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            3-Class classification breakdown
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Matrix grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    {/* Axis labels */}
                    <div className="flex justify-center mb-4 text-center">
                        <span className="text-xs text-white/30 font-medium uppercase tracking-wider block w-full pl-8">
                            Predicted Label
                        </span>
                    </div>

                    <div className="flex">
                        <div className="flex items-center mr-4 w-6 shrink-0 justify-center">
                            <span
                                className="text-xs text-white/30 font-medium uppercase tracking-wider whitespace-nowrap"
                                style={{
                                    writingMode: "vertical-rl",
                                    transform: "rotate(180deg)",
                                }}
                            >
                                Actual Label
                            </span>
                        </div>

                        <div className="flex-1">
                            {/* Column headers */}
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                <div className="text-center text-[10px] text-emerald-400/80 font-medium leading-tight">
                                    With Mask
                                </div>
                                <div className="text-center text-[10px] text-red-400/80 font-medium leading-tight">
                                    No Mask
                                </div>
                                <div className="text-center text-[10px] text-amber-400/80 font-medium leading-tight">
                                    Incorrect
                                </div>
                            </div>

                            {/* Matrix cells */}
                            {rows.map((row, rowIdx) => (
                                <div key={rowIdx} className="grid grid-cols-3 gap-2 mb-2">
                                    {row.map((cellKey, colIdx) => {
                                        const cell = matrixData[cellKey];
                                        const colors = colorMap[cell.color];
                                        const isHovered = hoveredCell === cellKey;
                                        const opacity = (hoveredCell && !isHovered) ? "opacity-40" : "opacity-100";
                                        
                                        return (
                                            <motion.div
                                                key={cellKey}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + (rowIdx * 3 + colIdx) * 0.05 }}
                                                onMouseEnter={() => setHoveredCell(cellKey)}
                                                onMouseLeave={() => setHoveredCell(null)}
                                                className={`rounded-xl p-3 border text-center cursor-pointer transition-all duration-300 ${colors.bg} ${colors.border} ${opacity} ${isHovered ? `shadow-lg scale-[1.05] ${colors.glow} z-10 relative` : ""}`}
                                            >
                                                <p className={`text-xl sm:text-2xl font-black ${colors.text}`}>
                                                    {cell.value.toLocaleString()}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Details card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 flex flex-col justify-center"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                        Cell Details
                    </p>
                    
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[160px]">
                        <AnimatePresence mode="wait">
                            {activeCell ? (
                                <motion.div
                                    key={hoveredCell}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full text-center"
                                >
                                    <h3 className={`font-display text-3xl font-black mb-2 ${colorMap[activeCell.color].text}`}>
                                        {activeCell.value}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 mb-4 text-sm font-medium">
                                        <span className="text-white/60">{activeCell.row}</span>
                                        <span className="text-white/30">→</span>
                                        <span className="text-white">{activeCell.col}</span>
                                    </div>
                                    <p className="text-sm text-white/50">{activeCell.desc}</p>
                                    <div className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-bold border ${colorMap[activeCell.color].bg} ${colorMap[activeCell.color].border} ${colorMap[activeCell.color].text}`}>
                                        {activeCell.label}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center text-white/30"
                                >
                                    <Grid3X3 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">Hover over any cell in the matrix<br/>to view detailed breakdown.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
