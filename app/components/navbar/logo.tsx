"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

// export const Logo = () => {
//   const router = useRouter();
//   return (
//     <Image
//       onClick={() => {
//         router.push("/");
//         router.refresh();
//       }}
//       alt="Logo Volonteri"
//       className="hidden md:block cursor-pointer"
//       height={"50"}
//       width={"70"}
//       src="/logo.png"
//     ></Image>
//   );
// };

export const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/");
        router.refresh();
      }}
      className="hidden md:block relative cursor-pointer translate-y-[.35rem] py-4"
    >
      <Image alt="Logo Volonteri" src="/logo.png" width={"60"} height={"60"} />
    </div>
  );
};
