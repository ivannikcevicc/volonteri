import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { Modal } from "./components/modals/modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
