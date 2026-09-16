import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "../data/store.js";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fungsi untuk membuat base URL dinamis
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

export const metadata = {
  // Menggunakan fungsi dinamis
  metadataBase: new URL(getBaseUrl()),

  title: {
    default: `${store.name} — Sewa iPhone di ${store.city}`,
    template: `%s | ${store.name}`,
  },

  description: `Sewa iPhone di ${store.name} mulai dari Rp50 ribu. Pilih iPhone dan aksesoris untuk ngonten, bisnis, liburan, atau kebutuhan lainnya.`,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: `Sewa iPhone di ${store.city} | ${store.name}`,
    description: `Sewa iPhone di ${store.city} untuk kebutuhan konten, bisnis, liburan, dan lainnya.`,
    url: "/",
    siteName: store.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/opengraph.webp",
        width: 1200,
        height: 630,
        alt: `${store.name} - Sewa iPhone di ${store.city}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Sewa iPhone di ${store.city} | ${store.name}`,
    description: `Sewa iPhone di ${store.city} untuk kebutuhan konten, bisnis, liburan, dan lainnya.`,
    images: ["/assets/opengraph.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children} <Analytics />
      </body>
    </html>
  );
}
