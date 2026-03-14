"use client";

import { motion, useInView, useAnimationControls } from "framer-motion";
import { Network } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   Static data
───────────────────────────────────────────────────────── */
const FEATURE_MAP: number[][] = [
    [4.2, 3.6],
    [3.4, 3.8],
];
const FLAT_VALUES = [4.2, 3.6, 3.4, 3.8];

const INPUT_NEURONS = FLAT_VALUES.map((v) => ({ value: v }));

const HIDDEN_NEURONS = [
    { value: 0.87 },
    { value: 0.23 },
    { value: 0.95 },
    { value: 0.62 },
    { value: 0.41 },
    { value: 0.78 },
    { value: 0.55 },
    { value: 0.33 },
];

const OUTPUT_NEURONS = [
    { label: "WITH MASK", probability: 0.89, color: "emerald" },
    { label: "NO MASK", probability: 0.08, color: "rose" },
    { label: "INCORRECT", probability: 0.03, color: "amber" },
];

/* Pre-generate stable random weights so they don't change on re-render */
function seededRand(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

function getWeight(fromIdx: number, toIdx: number, layerOffset: number) {
    return seededRand(fromIdx * 31 + toIdx * 17 + layerOffset);
}

/* Map weight 0-1 → colour + thickness */
function weightStyle(w: number) {
    if (w > 0.7) return { stroke: "#34d399", width: 1.6, glow: true };   // strong – green
    if (w > 0.4) return { stroke: "#a78bfa", width: 1.0, glow: false };  // medium – purple
    return { stroke: "#60a5fa", width: 0.6, glow: false };               // weak – blue
}

/* ─────────────────────────────────────────────────────────
   SVG neuron layout helpers
───────────────────────────────────────────────────────── */
const NODE_R = 22;
const SVG_W = 900;
const SVG_H = 520;

const COL_INPUT = 120;
const COL_HIDDEN = 450;
const COL_OUTPUT = 780;

function layerY(count: number, idx: number) {
    const total = (count - 1) * (NODE_R * 2 + 18);
    const start = SVG_H / 2 - total / 2 + 15;
    return start + idx * (NODE_R * 2 + 18);
}

/* ─────────────────────────────────────────────────────────
   Animated particle travelling along an SVG line
───────────────────────────────────────────────────────── */
interface ParticleProps {
    x1: number; y1: number;
    x2: number; y2: number;
    color: string;
}
function Particle({ x1, y1, x2, y2, color }: ParticleProps) {
    const [anim] = useState(() => ({
        speed: 1.2 + Math.random() * 2.0,
        delay: Math.random() * 3,
        repeat: 0.5 + Math.random() * 2.5,
    }));

    return (
        <motion.circle
            r={3.5}
            fill={color}
            filter="url(#particleGlow)"
            initial={{ cx: x1, cy: y1, opacity: 0 }}
            animate={{
                cx: [x1, x2],
                cy: [y1, y2],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                cx: { duration: anim.speed, delay: anim.delay, repeat: Infinity, repeatDelay: anim.repeat, ease: "linear" },
                cy: { duration: anim.speed, delay: anim.delay, repeat: Infinity, repeatDelay: anim.repeat, ease: "linear" },
                opacity: { duration: anim.speed, delay: anim.delay, repeat: Infinity, repeatDelay: anim.repeat, ease: "linear", times: [0, 0.1, 0.9, 1] }
            }}
        />
    );
}

/* ─────────────────────────────────────────────────────────
   Flatten Animation Panel
───────────────────────────────────────────────────────── */
function FlattenPanel() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 flex flex-col items-center gap-6"
            style={{ minHeight: 280 }}
        >
            <p className="font-label text-[11px] font-bold text-white/35 uppercase tracking-widest">
                ① Flatten Operation
            </p>

            {/* 2D grid */}
            <div className="flex flex-col gap-1.5">
                {FEATURE_MAP.map((row, ri) => (
                    <div key={ri} className="flex gap-1.5">
                        {row.map((val, ci) => (
                            <motion.div
                                key={ci}
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.2 + (ri * 2 + ci) * 0.1 }}
                                className="w-16 h-16 rounded-xl flex items-center justify-center font-mono text-sm font-bold text-violet-300"
                                style={{
                                    background: "rgba(139,92,246,0.12)",
                                    border: "1px solid rgba(139,92,246,0.3)",
                                    boxShadow: "0 0 10px rgba(139,92,246,0.15)",
                                }}
                            >
                                {val.toFixed(1)}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Arrow */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ delay: 0.65 }}
                style={{ transformOrigin: "top" }}
                className="flex flex-col items-center gap-1"
            >
                <div className="w-px h-6 bg-gradient-to-b from-violet-400/60 to-blue-400/60" />
                <svg width="14" height="8" viewBox="0 0 14 8">
                    <path d="M7 8 L0 0 L14 0 Z" fill="rgba(139,92,246,0.7)" />
                </svg>
                <span className="text-[10px] text-white/30 mt-1">flatten</span>
            </motion.div>

            {/* 1D vector */}
            <div className="flex gap-1.5 flex-wrap justify-center">
                {FLAT_VALUES.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.85 + i * 0.1, type: "spring", stiffness: 200 }}
                        className="w-16 h-14 rounded-xl flex items-center justify-center font-mono text-sm font-bold text-blue-300"
                        style={{
                            background: "rgba(59,130,246,0.12)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            boxShadow: "0 0 10px rgba(59,130,246,0.15)",
                        }}
                    >
                        {val.toFixed(1)}
                    </motion.div>
                ))}
            </div>

            <p className="text-[10px] text-white/25 mt-1">
                2D [2×2] → 1D vector · shape: [1, 4]
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────
   Main SVG network diagram
───────────────────────────────────────────────────────── */
function NetworkDiagram() {
    const svgRef = useRef<SVGSVGElement>(null);
    const inView = useInView(svgRef, { once: true, margin: "-60px" });

    const [hoveredNeuron, setHoveredNeuron] = useState<{ layer: string; idx: number } | null>(null);
    const [hoveredConn, setHoveredConn] = useState<{ w: number; wx: number; wy: number } | null>(null);
    const [phase, setPhase] = useState(0); // 0=idle, 1=input, 2=ihconn, 3=hidden, 4=hoconn, 5=output

    useEffect(() => {
        if (!inView) return;
        const timers = [
            setTimeout(() => setPhase(1), 100),
            setTimeout(() => setPhase(2), 600),
            setTimeout(() => setPhase(3), 1400),
            setTimeout(() => setPhase(4), 2000),
            setTimeout(() => setPhase(5), 2800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [inView]);

    /* pre-compute connection positions */
    const ihConnections = INPUT_NEURONS.flatMap((_, ii) =>
        HIDDEN_NEURONS.map((_, hi) => {
            const w = getWeight(ii, hi, 0);
            return {
                x1: COL_INPUT, y1: layerY(INPUT_NEURONS.length, ii),
                x2: COL_HIDDEN, y2: layerY(HIDDEN_NEURONS.length, hi),
                w,
                ii, hi,
            };
        })
    );

    const hoConnections = HIDDEN_NEURONS.flatMap((_, hi) =>
        OUTPUT_NEURONS.map((_, oi) => {
            const w = getWeight(hi, oi, 100);
            return {
                x1: COL_HIDDEN, y1: layerY(HIDDEN_NEURONS.length, hi),
                x2: COL_OUTPUT, y2: layerY(OUTPUT_NEURONS.length, oi),
                w,
                hi, oi,
            };
        })
    );

    function isIHHighlighted(ii: number, hi: number) {
        if (!hoveredNeuron) return true;
        if (hoveredNeuron.layer === "input" && hoveredNeuron.idx === ii) return true;
        if (hoveredNeuron.layer === "hidden" && hoveredNeuron.idx === hi) return true;
        return false;
    }

    function isHOHighlighted(hi: number, oi: number) {
        if (!hoveredNeuron) return true;
        if (hoveredNeuron.layer === "hidden" && hoveredNeuron.idx === hi) return true;
        if (hoveredNeuron.layer === "output" && hoveredNeuron.idx === oi) return true;
        return false;
    }

    const outputColors = ["#34d399", "#f43f5e", "#fbbf24"];
    const outputGlowColors = ["rgba(52,211,153,", "rgba(244,63,94,", "rgba(251,191,36,"];

    return (
        <div className="relative w-full">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="w-full"
                style={{ height: "min(520px, 58vw)" }}
                onMouseLeave={() => { setHoveredNeuron(null); setHoveredConn(null); }}
            >
                <defs>
                    <filter id="particleGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <radialGradient id="inputGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </radialGradient>
                    <radialGradient id="hiddenGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#c4b5fd" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </radialGradient>
                    <radialGradient id="outputGradGreen" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="100%" stopColor="#059669" />
                    </radialGradient>
                    <radialGradient id="outputGradRed" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fda4af" />
                        <stop offset="100%" stopColor="#e11d48" />
                    </radialGradient>
                    <radialGradient id="outputGradAmber" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fcd34d" />
                        <stop offset="100%" stopColor="#d97706" />
                    </radialGradient>
                </defs>

                {/* ── Layer labels ── */}
                {[
                    { x: COL_INPUT, label: "INPUT LAYER", sub: `${INPUT_NEURONS.length} neurons` },
                    { x: COL_HIDDEN, label: "HIDDEN LAYER", sub: `${HIDDEN_NEURONS.length} neurons` },
                    { x: COL_OUTPUT, label: "OUTPUT LAYER", sub: "3 classes" },
                ].map(({ x, label, sub }) => (
                    <g key={label}>
                        <text x={x} y={14} textAnchor="middle" fill="rgba(255,255,255,0.3)"
                            fontSize="9" fontWeight="700" letterSpacing="2">
                            {label}
                        </text>
                        <text x={x} y={28} textAnchor="middle" fill="rgba(255,255,255,0.18)"
                            fontSize="8">
                            {sub}
                        </text>
                    </g>
                ))}

                {/* ── Input→Hidden connections ── */}
                {phase >= 2 && ihConnections.map((c, idx) => {
                    const ws = weightStyle(c.w);
                    const highlighted = isIHHighlighted(c.ii, c.hi);
                    return (
                        <motion.line
                            key={`ih-${idx}`}
                            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                            stroke={ws.stroke}
                            strokeWidth={ws.width}
                            strokeOpacity={highlighted ? 0.45 : 0.06}
                            filter={ws.glow ? "url(#strongGlow)" : undefined}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: idx * 0.008 }}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => {
                                const svg = svgRef.current!.getBoundingClientRect();
                                setHoveredConn({ w: c.w, wx: e.clientX - svg.left, wy: e.clientY - svg.top });
                            }}
                            onMouseLeave={() => setHoveredConn(null)}
                        />
                    );
                })}

                {/* ── Hidden→Output connections ── */}
                {phase >= 4 && hoConnections.map((c, idx) => {
                    const ws = weightStyle(c.w);
                    const highlighted = isHOHighlighted(c.hi, c.oi);
                    return (
                        <motion.line
                            key={`ho-${idx}`}
                            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                            stroke={ws.stroke}
                            strokeWidth={ws.width}
                            strokeOpacity={highlighted ? 0.55 : 0.08}
                            filter={ws.glow ? "url(#strongGlow)" : undefined}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.015 }}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => {
                                const svg = svgRef.current!.getBoundingClientRect();
                                setHoveredConn({ w: c.w, wx: e.clientX - svg.left, wy: e.clientY - svg.top });
                            }}
                            onMouseLeave={() => setHoveredConn(null)}
                        />
                    );
                })}

                {/* ── Particles IH ── */}
                {phase >= 3 && ihConnections
                    .filter((_, i) => seededRand(i * 11) > 0.5)
                    .map((c) => (
                        <Particle key={`p-ih-${c.ii}-${c.hi}`}
                            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                            color="#818cf8"
                        />
                    ))}

                {/* ── Particles HO ── */}
                {phase >= 5 && hoConnections
                    .filter((_, i) => seededRand(i * 23) > 0.3)
                    .map((c) => (
                        <Particle key={`p-ho-${c.hi}-${c.oi}`}
                            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                            color={outputColors[c.oi]}
                        />
                    ))}

                {/* ── Input Neurons ── */}
                {INPUT_NEURONS.map((n, i) => {
                    const cx = COL_INPUT;
                    const cy = layerY(INPUT_NEURONS.length, i);
                    const active = hoveredNeuron?.layer === "input" && hoveredNeuron?.idx === i;
                    return (
                        <g key={`in-${i}`} style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoveredNeuron({ layer: "input", idx: i })}
                            onMouseLeave={() => setHoveredNeuron(null)}>
                            {phase >= 1 && (
                                <>
                                    {/* pulse ring */}
                                    <motion.circle cx={cx} cy={cy} r={NODE_R + 6}
                                        fill="none" stroke="#60a5fa" strokeWidth="1"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.3, 0, 0.3] }}
                                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    />
                                    <motion.circle cx={cx} cy={cy} r={NODE_R}
                                        fill="url(#inputGrad)"
                                        filter="url(#nodeGlow)"
                                        stroke={active ? "#93c5fd" : "rgba(96,165,250,0.5)"}
                                        strokeWidth={active ? 2 : 1}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
                                    />
                                    <text x={cx} y={cy + 5} textAnchor="middle"
                                        fill="white" fontSize="10" fontWeight="700"
                                        style={{ pointerEvents: "none" }}>
                                        {n.value.toFixed(1)}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}

                {/* ── Hidden Neurons ── */}
                {HIDDEN_NEURONS.map((n, i) => {
                    const cx = COL_HIDDEN;
                    const cy = layerY(HIDDEN_NEURONS.length, i);
                    const active = hoveredNeuron?.layer === "hidden" && hoveredNeuron?.idx === i;
                    return (
                        <g key={`hn-${i}`} style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoveredNeuron({ layer: "hidden", idx: i })}
                            onMouseLeave={() => setHoveredNeuron(null)}>
                            {phase >= 3 && (
                                <>
                                    <motion.circle cx={cx} cy={cy} r={NODE_R + 5}
                                        fill="none" stroke="#a78bfa" strokeWidth="1"
                                        animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.25, 0, 0.25] }}
                                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.18 }}
                                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    />
                                    <motion.circle cx={cx} cy={cy} r={NODE_R}
                                        fill="url(#hiddenGrad)"
                                        filter="url(#nodeGlow)"
                                        stroke={active ? "#c4b5fd" : "rgba(167,139,250,0.5)"}
                                        strokeWidth={active ? 2 : 1}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.05 + i * 0.07, type: "spring" }}
                                    />
                                    <text x={cx} y={cy + 4} textAnchor="middle"
                                        fill="white" fontSize="9" fontWeight="700"
                                        style={{ pointerEvents: "none" }}>
                                        {n.value.toFixed(2)}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}

                {/* ── Output Neurons ── */}
                {OUTPUT_NEURONS.map((n, i) => {
                    const cx = COL_OUTPUT;
                    const cy = layerY(OUTPUT_NEURONS.length, i);
                    const active = hoveredNeuron?.layer === "output" && hoveredNeuron?.idx === i;
                    const gradId = i === 0 ? "outputGradGreen" : i === 1 ? "outputGradRed" : "outputGradAmber";
                    const ringColor = i === 0 ? "#34d399" : i === 1 ? "#f43f5e" : "#fbbf24";
                    return (
                        <g key={`on-${i}`} style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoveredNeuron({ layer: "output", idx: i })}
                            onMouseLeave={() => setHoveredNeuron(null)}>
                            {phase >= 5 && (
                                <>
                                    {/* outer glow ring */}
                                    <motion.circle cx={cx} cy={cy} r={NODE_R + 10}
                                        fill="none" stroke={ringColor} strokeWidth="1.5"
                                        animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.4, 0, 0.4] }}
                                        transition={{ duration: 2.0, repeat: Infinity, delay: i * 0.4 }}
                                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    />
                                    <motion.circle cx={cx} cy={cy} r={NODE_R + 6}
                                        fill="none" stroke={ringColor} strokeWidth="1"
                                        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 + 0.3 }}
                                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    />
                                    <motion.circle cx={cx} cy={cy} r={NODE_R + 2}
                                        fill={`${outputGlowColors[i]}0.15)`}
                                        stroke={active ? ringColor : `${outputGlowColors[i]}0.45)`}
                                        strokeWidth={active ? 2.5 : 1.5}
                                        filter="url(#nodeGlow)"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
                                    />
                                    <motion.circle cx={cx} cy={cy} r={NODE_R}
                                        fill={`url(#${gradId})`}
                                        filter="url(#nodeGlow)"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
                                    />
                                    <text x={cx} y={cy - 5} textAnchor="middle"
                                        fill="white" fontSize="7.5" fontWeight="800" letterSpacing="0.5"
                                        style={{ pointerEvents: "none" }}>
                                        {n.label}
                                    </text>
                                    <text x={cx} y={cy + 8} textAnchor="middle"
                                        fill="white" fontSize="11" fontWeight="900"
                                        style={{ pointerEvents: "none" }}>
                                        {n.probability.toFixed(2)}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}

                {/* ── Hover tooltip for connection weight ── */}
                {hoveredConn && (
                    <g>
                        <rect
                            x={hoveredConn.wx - 45}
                            y={hoveredConn.wy - 30}
                            width={90} height={24}
                            rx={6}
                            fill="rgba(15,15,30,0.92)"
                            stroke="rgba(167,139,250,0.5)"
                            strokeWidth="1"
                        />
                        <text
                            x={hoveredConn.wx}
                            y={hoveredConn.wy - 13}
                            textAnchor="middle"
                            fill="#c4b5fd"
                            fontSize="9"
                            fontWeight="600"
                        >
                            Weight: {hoveredConn.w.toFixed(3)}
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   Weight legend
───────────────────────────────────────────────────────── */
function WeightLegend() {
    const items = [
        { color: "#60a5fa", label: "Weak connection", dash: "2 4", w: 1 },
        { color: "#a78bfa", label: "Medium connection", dash: "", w: 1.2 },
        { color: "#34d399", label: "Strong connection", dash: "", w: 2 },
    ];
    return (
        <div className="flex flex-wrap items-center justify-center gap-5 mt-2">
            {items.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                    <svg width="36" height="10" viewBox="0 0 36 10">
                        <line x1="0" y1="5" x2="36" y2="5"
                            stroke={item.color}
                            strokeWidth={item.w}
                            strokeDasharray={item.dash}
                            strokeOpacity="0.9"
                        />
                    </svg>
                    <span className="text-[10px] text-white/40">{item.label}</span>
                </div>
            ))}
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="text-[10px] text-white/40">Mask prediction</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                <span className="text-[10px] text-white/40">No-Mask prediction</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                <span className="text-[10px] text-white/40">Incorrect Mask prediction</span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────── */
export default function FullyConnectedSection() {
    return (
        <section className="space-y-8">
            {/* ── Section header ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple text-white text-sm font-black font-display shadow-lg shadow-neon-blue/20">
                        5
                    </div>
                    <div>
                        <h2 className="font-display text-2xl font-black text-white tracking-wider uppercase">Fully Connected Layer</h2>
                        <p className="font-label text-xs text-white/35 mt-0.5 max-w-2xl">
                            Flattened feature vectors are passed through dense neural layers where each neuron
                            connects to all neurons in the previous layer to compute final predictions.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* ── Flatten card ── */}
            <FlattenPanel />

            {/* ── Main network diagram card ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card p-8"
                style={{ minHeight: 620 }}
            >
                {/* Card header */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/30 to-pink-500/30 border border-violet-500/20 flex items-center justify-center">
                        <Network className="w-4 h-4 text-violet-300" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white/80">Dense Neural Network</p>
                        <p className="text-[10px] text-white/35">
                            Fully connected architecture · Hover neurons or connections to explore
                        </p>
                    </div>

                    {/* Live badge */}
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-blue/8 border border-neon-blue/15">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-neon-blue"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                        />
                        <span className="font-label text-[10px] text-neon-blue font-semibold">Simulating</span>
                    </div>
                </div>

                {/* ── SVG diagram ── */}
                <NetworkDiagram />

                {/* ── Weight legend ── */}
                <WeightLegend />
            </motion.div>
        </section>
    );
}
