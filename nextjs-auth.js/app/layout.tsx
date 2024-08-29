import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth.js CustomB.C",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col antialiased",
          inter.className,
        )}
      >
        <Toaster position="top-center" duration={5000} />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col bg-neutral-50/50">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
