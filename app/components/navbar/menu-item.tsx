"use client";

interface Menu {
  onClick: () => void;
  label: string;
}
import React from "react";

export const MenuItem: React.FC<Menu> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-3 py-4 hover:bg-neutral-200 transition font-semibold "
    >
      {label}
    </div>
  );
};
