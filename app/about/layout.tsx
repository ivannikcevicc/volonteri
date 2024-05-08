"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="pb-10 pt-5 text-center flex flex-col items-center align-center gap-3">
      <div
        onClick={() => {
          router.push("/");
          router.refresh();
        }}
        className=" relative cursor-pointer translate-y-[.35rem] py-4"
      >
        <Image
          alt="Logo Volonteri"
          src="/logo.png"
          width={"60"}
          height={"60"}
        />
      </div>
      {children}
    </div>
  );
};

export default Layout;
