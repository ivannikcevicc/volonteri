"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
}
export const CategoryBox = ({ icon: Icon, label, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      // className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 w-[100px] text-ellipsis hover:text-green-800 transition cursor-pointer
      // ${selected ? "border-b-green-900" : "border-transparent"}
      // ${selected ? "text-green-900" : "text-neutral-500"}
      // `}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 w-[100px] text-ellipsis hover:text-green-800 transition cursor-pointer 
      ${selected ? "border-b-green-900" : "border-transparent"}
      ${selected ? "text-green-900" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm overflow-hidden text-nowrap text-ellipsis w-[50px] text-center">
        {label}
      </div>
    </div>
  );
};
