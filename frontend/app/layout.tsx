import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/sidebar";
import { InitPopovers } from "@/app/components/initPopovers";
import { SIDEBAR_WIDTH_CLASS } from "@/app/lib/constants";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slovní hry",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="cs">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className={`flex-1 ${SIDEBAR_WIDTH_CLASS} p-4 md:p-6`}>
                {children}
                <Toaster />
            </main>
        </div>
        <InitPopovers />
        </body>
        </html>
    );
}
