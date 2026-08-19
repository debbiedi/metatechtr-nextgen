import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MetaTechTR | Türkiye'nin Bambu Lab & Prusa Resmi Distribütörü",
  description:
    "MetaTechTR: 3D yazıcılar, 3D tarayıcılar, Bambu Lab, Original Prusa, filamentler, reçineler ve yetkili teknik servis güvencesi.",
  icons: {
    icon: "https://store.metatechtr.com/Data/EditorFiles/catalog/metatechtr/logo/chain.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
