"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { DiVim } from "react-icons/di";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  requiredMsg: string;
  errorMsg: string;
  regex: RegExp;
}

export const TextArea: React.FC<Props> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
  requiredMsg,
  errorMsg,
  regex,
}) => {
  console.log(errors);
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <textarea
        id={id}
        disabled={disabled}
        placeholder=" "
        className={`h-[10rem] peer w-full p-3 pt-5 font-light bg-white rounded-[25px] border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-blue-900" : "border-neutral-300"}
        ${errors[id] ? "focus:border-blue-900" : "focus:border-black"}`}
        {...register(id, {
          required: requiredMsg,
          pattern: {
            value: regex,
            message: errorMsg,
          },
        })}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-[1.1rem] z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-green-800" : "text-zinc-400"
        }`}
      >
        {label}
      </label>
      {errors[id] && <div>{`${errors[id]?.message}`}</div>}
    </div>
  );
};
