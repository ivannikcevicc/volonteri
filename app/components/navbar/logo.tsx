"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

export const Logo = () => {
  const router = useRouter();
  return (
    <Image
      alt="Logo Airbnb"
      className="hidden md:block cursor-pointer"
      height={"100"}
      width={"100"}
      src="/airbnb.png"
    ></Image>
  );
};
