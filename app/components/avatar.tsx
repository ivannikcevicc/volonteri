"use client";

import Image from "next/image";
import React from "react";

interface Props {
  src?: string | null | undefined;
}

export const Avatar = ({ src }: Props) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width={"30"}
      alt="Avatar"
      src={src || "/placeholder.webp"}
    ></Image>
  );
};
