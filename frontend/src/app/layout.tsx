import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "MaskGuard AI — Intelligent Face Mask Compliance Monitoring",
    description:
        "AI-powered real-time face mask detection and compliance monitoring system. Detect multiple faces, analyze mask compliance, and track analytics with deep learning.",
    keywords: [
        "face mask detection",
        "AI compliance monitoring",
        "computer vision",
        "deep learning",
        "mask detection API",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased noise-bg grid-overlay particle-bg">{children}</body>
        </html>
    );
}
