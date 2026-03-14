"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Image as ImageIcon, X, Loader2, Maximize2, ShieldCheck, Scan } from "lucide-react";
import DetectionResult from "./DetectionResult";
import { detectFaces } from "@/lib/api";
import { DetectionResponse } from "@/types/prediction";

export default function UploadCard() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DetectionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        setError(null);
        setResult(null);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file (JPEG, PNG).");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("File size exceeds 5MB limit.");
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleClear = () => {
        setSelectedFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError(null);

        try {
            const response = await detectFaces(selectedFile);
            setResult(response);
        } catch (err: any) {
            console.error("Analysis error:", err);
            setError(err.response?.data?.detail || "Failed to analyze image. Ensure API is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="upload" className="max-w-6xl mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="gradient-border"
            >
                <div className="glass-card p-6 md:p-10 relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neon-blue/10 text-neon-blue mb-4 glow-cyan">
                            <Maximize2 className="w-6 h-6" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-white mb-2 tracking-wider uppercase">
                            Detection Engine
                        </h2>
                        <p className="text-sm text-white/45">
                            Upload a crowd photo or individual portrait to analyze mask compliance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {/* Upload Zone */}
                        <div className="flex flex-col">
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => !selectedFile && inputRef.current?.click()}
                                className={`relative flex-1 flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out min-h-[300px] ${dragActive
                                    ? "border-neon-blue bg-neon-blue/5 glow-cyan"
                                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-neon-blue/30"
                                    } ${!selectedFile ? "cursor-pointer" : ""}`}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleChange}
                                    className="hidden"
                                />

                                <AnimatePresence mode="wait">
                                    {!selectedFile ? (
                                        <motion.div
                                            key="upload-prompt"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-center"
                                        >
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-blue/5 border border-neon-blue/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                                <UploadCloud className="w-8 h-8 text-neon-blue/50" />
                                            </div>
                                            <p className="text-sm font-medium text-white mb-1">
                                                Click or drag image to upload
                                            </p>
                                            <p className="text-xs text-white/30">
                                                JPEG, PNG up to 5MB
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 w-full h-full p-2"
                                        >
                                            <div className="relative w-full h-full rounded-xl overflow-hidden group">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={previewUrl!}
                                                    alt="Preview"
                                                    className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? "opacity-40 blur-sm" : "opacity-100"
                                                        }`}
                                                />
                                                {!loading && !result && (
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleClear();
                                                            }}
                                                            className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors glow-red"
                                                            title="Remove image"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Scanning Overlay */}
                                                {loading && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 scan-line">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                            className="w-12 h-12 border-4 border-neon-blue/30 border-t-neon-blue rounded-full mb-3 shadow-neon"
                                                        />
                                                        <span className="font-label text-sm font-semibold text-neon-blue shadow-black drop-shadow-md bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-neon-blue/20">
                                                            Scanning faces...
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex gap-3">
                                {selectedFile && !result && (
                                    <>
                                        <button
                                            onClick={handleClear}
                                            disabled={loading}
                                            className="btn-secondary flex-1 py-3 px-4 text-sm font-medium disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAnalyze}
                                            disabled={loading}
                                            className="btn-primary flex-[2] py-3 px-4 text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2 group relative overflow-hidden"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Scan className="w-4 h-4" />
                                                    Analyze Image
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}

                                {result && (
                                    <button
                                        onClick={handleClear}
                                        className="btn-secondary w-full py-3 px-4 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        Scan Another Image
                                    </button>
                                )}
                            </div>

                            {/* Error Alert */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        className="mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 glow-red"
                                    >
                                        <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                        <p className="text-sm text-red-300">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Result Display Area */}
                        <div className="flex flex-col max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                            {!result && !loading && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-neon-blue/5 rounded-2xl bg-white/[0.01]">
                                    <div className="w-12 h-12 rounded-full bg-neon-blue/5 flex items-center justify-center mb-4">
                                        <ShieldCheck className="w-6 h-6 text-neon-blue/20" />
                                    </div>
                                    <h3 className="font-display text-sm font-semibold text-white/50 mb-2 tracking-wider uppercase">
                                        Ready for Analysis
                                    </h3>
                                    <p className="text-sm text-white/30 max-w-[250px]">
                                        Upload an image on the left to see the AI detection results here.
                                    </p>
                                </div>
                            )}

                            {loading && (
                                <div className="h-full flex flex-col items-center justify-center p-8 border border-neon-blue/5 rounded-2xl bg-white/[0.01]">
                                    <div className="space-y-4 w-full max-w-[200px]">
                                        <div className="h-4 bg-neon-blue/5 rounded animate-pulse w-3/4 mx-auto" />
                                        <div className="h-2 bg-neon-blue/5 rounded animate-pulse w-full" />
                                        <div className="h-2 bg-neon-blue/5 rounded animate-pulse w-5/6 mx-auto" />
                                    </div>
                                </div>
                            )}

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="h-full"
                                >
                                    <DetectionResult result={result} />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
