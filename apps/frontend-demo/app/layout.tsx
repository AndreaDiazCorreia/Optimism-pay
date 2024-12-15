import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optimism Pay",
  description: "Fast and secure crypto payments on Optimism",
  icons: {
    icon: "/favicon.ico", // Aquí defines el favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
