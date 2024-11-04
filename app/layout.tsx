import type { Metadata } from "next";
import localFont from "next/font/local";
import  "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "Create Race availability",
  description: "Made by LarsKHansen - rights 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
