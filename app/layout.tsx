import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "BitShadow | Esteganografia com Encriptação AES-256",
  description:
    "Aplicação profissional de esteganografia que permite ocultar mensagens encriptadas em imagens utilizando o método LSB (Least Significant Bit) e encriptação AES-256. Projeto académico de segurança informática - ISTEC.",
  keywords: [
    "esteganografia",
    "steganography",
    "AES",
    "encriptação",
    "LSB",
    "segurança",
    "criptografia",
    "ocultar mensagens",
    "imagens",
    "BitShadow",
    "ISTEC",
  ],
  authors: [{ name: "Tomás Gaspar 2024164 - ISTEC" }],
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
