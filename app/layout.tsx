import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "GBIM APTIKOM",
  description: "Sistem Guru Besar Infokom Mengabdi",
};

// Menggunakan font DM Sans sesuai pedoman tipografi
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans", // Harus sama dengan yang ada di CSS
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Warna background dan text default sudah diatur di globals.css, tapi kita pertegas di sini */}
      <body className={`${dmSans.className} bg-background text-textMain min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}