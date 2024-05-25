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
import Loader from "./components/loader";
import { ProfileModal } from "./components/modals/ProfileModal";
import { ApplicationModal } from "./components/modals/ApplicationModal";
import { EdgeStoreProvider } from "./libs/edgestore";
import { InformationModal } from "./components/modals/InformationModal";
import { ContactModal } from "./components/modals/ContactModal";
import { ReviewModal } from "./components/modals/ReviewModal";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Volonteri",
  description: "sajt za volontere",
  icons: {
    icon: "/public/logo.png",
    apple: "/public/logo.png",
  },
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
        <EdgeStoreProvider>
          <Suspense fallback={<Loader />}>
            <ProfileModal currentUser={currentUser} />
            <ContactModal currentUser={currentUser} />
            <ToasterProvider />
            <ReviewModal currentUser={currentUser} />
            <SearchModal />
            <RegisterModal />
            <ApplicationModal currentUser={currentUser} />
            <LoginModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
            <div className="pt-24">{children}</div>
          </Suspense>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
