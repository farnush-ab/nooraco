import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نوراکو · Nooraco — قطعات چرخ خیاطی صنعتی",
  description:
    "نوراکو، تخصصی‌ترین مرجع قطعات چرخ‌های خیاطی صنعتی در ایران. اصالت، دقت و پشتیبانی — از ۱۳۹۳.",
  keywords: ["نوراکو", "nooraco", "چرخ خیاطی صنعتی", "قطعات چرخ خیاطی", "PIN", "STRONG H"],
  metadataBase: new URL("https://nooraco.ir"),
  openGraph: {
    title: "نوراکو · Nooraco",
    description: "مرجع تخصصی قطعات چرخ‌های خیاطی صنعتی",
    locale: "fa_IR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ebebee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Estedad:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body className="bg-ink-100 text-ink-900">{children}</body>
    </html>
  );
}
