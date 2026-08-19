import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
