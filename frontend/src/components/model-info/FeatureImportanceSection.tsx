"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const featureData = [
    { name: "Nose-Mouth Region", importance: 92, color: "#00E5FF" },
    { name: "Mask Texture", importance: 85, color: "#00BFFF" },
    { name: "Face Shape", importance: 78, color: "#34d399" },
    { name: "Edge Detection", importance: 71, color: "#fbbf24" },
    { name: "Ear Loops", importance: 63, color: "#f87171" },
    { name: "Eye Region", importance: 56, color: "#7A5FFF" },
    { name: "Background Context", importance: 38, color: "#fb923c" },
];

const tooltipStyle = {
    background: "rgba(15,15,30,0.95)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px",
    backdropFilter: "blur(10px)",
};

export default function FeatureImportanceSection() {
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
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
                            Feature Importance
                        </h2>
                        <p className="font-label text-xs text-white/35">
                            Influential visual patterns detected by CNN
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        Multivariate Importance Profile
                    </p>
                    <ResponsiveContainer width="100%" height={320}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={featureData}>
                            <PolarGrid stroke="rgba(255,255,255,0.15)" />
                            <PolarAngleAxis 
                                dataKey="name" 
                                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} 
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Importance"
                                dataKey="importance"
                                stroke="#00E5FF"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                                fillOpacity={0.4}
                                animationBegin={300}
                                animationDuration={1200}
                            />
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#7A5FFF" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={tooltipStyle}
                                formatter={(value: any) => [`${value}%`, "Importance"]}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Feature details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
                    <p className="font-label text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">
                        Pattern Analysis
                    </p>
                    <div className="space-y-3">
                        {featureData.map((f, idx) => (
                            <motion.div
                                key={f.name}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.25 + idx * 0.06 }}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{ backgroundColor: f.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-white/70 truncate">
                                            {f.name}
                                        </span>
                                        <span className="text-xs text-white/50 font-mono ml-2">
                                            {f.importance}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${f.importance}%` }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.3 + idx * 0.06,
                                            }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: f.color, opacity: 0.7 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
