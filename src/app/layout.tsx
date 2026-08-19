import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetaTechTR | Türkiye'nin Bambu Lab & Prusa Resmi Distribütörü",
  description:
    "MetaTechTR: 3D yazıcılar, 3D tarayıcılar, Bambu Lab X1C/P1S/A1 serileri, Prusa MK4S, Uzy filamentler, reçineler ve yetkili teknik servis güvencesi.",
  keywords: [
    "3D Yazıcı",
    "Bambu Lab Türkiye",
    "Original Prusa",
    "Bambu Lab X1-Carbon",
    "Bambu Lab P1S",
    "3D Tarayıcı",
    "Filament",
    "PLA Filament",
    "3D Baskı Hizmeti",
    "MetaTechTR",
  ],
  authors: [{ name: "MetaTechTR" }],
  openGraph: {
    title: "MetaTechTR | 3D Yazıcı ve Teknolojileri Türkiye Distribütörü",
    description:
      "Bambu Lab, Original Prusa ve Flsun 3D yazıcı modelleri, orijinal yedek parçalar ve yüksek hızlı filamentler.",
    url: "https://store.metatechtr.com",
    siteName: "MetaTechTR Store",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
