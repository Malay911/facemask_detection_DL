"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelIdentitySection from "@/components/model-info/ModelIdentitySection";
import PerformanceBenchmarksSection from "@/components/model-info/PerformanceBenchmarksSection";
import HyperparametersSection from "@/components/model-info/HyperparametersSection";
import ConfusionMatrixSection from "@/components/model-info/ConfusionMatrixSection";
import FeatureImportanceSection from "@/components/model-info/FeatureImportanceSection";

export default function ModelInfoPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-28 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center glow-blue">
                                    <Cpu className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
                                        Model Information
                                    </h1>
                                    <p className="font-label text-xs text-white/35 mt-0.5">
                                        Architecture · Benchmarks · Training Configuration
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Sections */}
                    <div className="space-y-12">
                        <ModelIdentitySection />
                        <PerformanceBenchmarksSection />
                        <HyperparametersSection />
                        <ConfusionMatrixSection />
                        <FeatureImportanceSection />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
