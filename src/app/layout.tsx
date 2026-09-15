import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BusinessProvider } from "@/context/BusinessContext";
import { AuthProvider } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Revolga Biogenics | Medical & Healthcare Solutions",
  description: "Revolga Biogenics is a medical and healthcare products company committed to delivering quality medical solutions, formulations, surgical supplies, and healthcare products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <BusinessProvider>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </BusinessProvider>
      </body>
    </html>
  );
}
