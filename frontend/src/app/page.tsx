"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadCard from "@/components/UploadCard";
import HowItWorksPreview from "@/components/HowItWorksPreview";
import Footer from "@/components/Footer";

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <HeroSection />
            <UploadCard />
            <HowItWorksPreview />
            <Footer />
        </main>
    );
}
