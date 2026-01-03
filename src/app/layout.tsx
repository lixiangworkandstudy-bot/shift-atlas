import type { Metadata } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Inter,
  Press_Start_2P,
  Share_Tech_Mono
} from "next/font/google";
import "./globals.css";

// Display font for hero titles
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Monospace font for code/system text
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Body font
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Pixel font for retrofuturistic elements
const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

// System/sci-fi mono font
const shareTechMono = Share_Tech_Mono({
  variable: "--font-system",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Echo Li | Human-Centered AI & Product Designer",
  description: "Designing systems people can trust. Portfolio of Echo Li - Product Design, UX Systems, and AI-focused design work.",
  keywords: ["Product Design", "UX Design", "AI Design", "Human-Centered Design", "Portfolio"],
  authors: [{ name: "Echo Li" }],
  openGraph: {
    title: "Echo Li | Human-Centered AI & Product Designer",
    description: "Designing systems people can trust.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${spaceGrotesk.variable}
          ${jetbrainsMono.variable}
          ${inter.variable}
          ${pressStart2P.variable}
          ${shareTechMono.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
