"use client";

import Image from "next/image";
import React from "react";

interface Props {
  src?: string | null | undefined;
  height?: number | `${number}` | undefined;
  width?: number | `${number}` | undefined;
}

export const Avatar = ({ src, height = "30", width = "30" }: Props) => {
  return (
    <Image
      className="rounded-full"
      height={height}
      width={width}
      alt="Avatar"
      objectFit={"contain"}
      src={src || "/placeholder.webp"}
    ></Image>
  );
};
