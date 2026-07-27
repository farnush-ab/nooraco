import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نوراکو · Nooraco — قطعات چرخ خیاطی صنعتی",
  description:
    "نوراکو، تخصصی‌ترین مرجع قطعات چرخ‌های خیاطی صنعتی در ایران. اصالت، دقت و پشتیبانی حرفه‌ای — از ۱۳۹۳.",
  keywords: [
    "نوراکو",
    "nooraco",
    "چرخ خیاطی صنعتی",
    "قطعات چرخ خیاطی",
    "راسته دوز",
    "سردوز",
    "میاندوز",
    "PIN",
    "STRONG H",
  ],
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
      <body className="bg-ink-100 text-ink-900">{children}</body>
    </html>
  );
}
