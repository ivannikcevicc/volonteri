import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { RegisterModal } from "./components/modals/register-modal";
import { ToasterProvider } from "./providers/toaster-provider";
import { LoginModal } from "./components/modals/login-modal";
import getCurrentUser from "./actions/getCurrentUser";
import { RentModal } from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import { Suspense } from "react";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <Suspense>
          <ToasterProvider />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
