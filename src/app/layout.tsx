import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exclusive Masterclass: Mastering Productivity | EduSync 2026",
  description:
    "Join our high-impact webinar on March 16, 2026. Conquer your academic workload and master time management with the EduSync research-backed framework. Limited spots available.",
  openGraph: {
    title: "Mastering Productivity: The EduSync Masterclass",
    description: "Reclaim your academic focus with research-backed strategies.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans bg-slate-950 text-white min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
