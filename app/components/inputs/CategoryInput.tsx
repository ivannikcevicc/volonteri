"use client";

import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col hover:border-black transition gap-3 cursor-pointer 
      ${selected ? "border-black" : "border-neutral-200"}`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};
