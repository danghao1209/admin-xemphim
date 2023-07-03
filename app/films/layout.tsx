import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XemPhim",
  description: "Quản lý trang xem phim",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vn">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
