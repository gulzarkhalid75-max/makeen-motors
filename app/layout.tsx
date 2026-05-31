import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import GlobalMobileHeader from "@/components/GlobalMobileHeader";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Makeen Motors",
    default: "Makeen Motors — Premium Automotive Dubai",
  },
  description:
    "Dubai's premier luxury automotive destination. Curated selection of the world's finest vehicles, delivered with white-glove precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black overflow-x-hidden">
        <AuthProvider>
          <GlobalMobileHeader />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
