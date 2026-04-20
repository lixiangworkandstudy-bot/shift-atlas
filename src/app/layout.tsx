import type { Metadata } from "next";
import "./globals.css";
import { buildLanguageBootstrapScript } from '@/lib/language';

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
    <html lang="en" suppressHydrationWarning translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: buildLanguageBootstrapScript() }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
