import React from "react";
import Image from "next/image";
import "./image-text.modules.scss";
import { IoRocketOutline } from "react-icons/io5";

interface Props {
  title: string;
  src: string;
  subtitle?: string;
  tag?: string;
  invert?: boolean;
}

const ImageText = ({
  title,
  subtitle,
  src,
  invert = false,
  tag = "Volonteri",
}: Props) => {
  return (
    <div
      className={` pt-10 flex gap-[5%] h-[60vh] w-full cat:grid ${
        invert ? "cat:grid-cols-[60fr,40fr]" : "cat:grid-cols-[40fr,60fr]"
      } cat:grid-cols-[40fr,60fr] flex-col px-[5%] justify-center align-center`}
    >
      <div
        className={`w-full h-full img rounded-xl ${
          invert ? "cat:order-[2]" : "cat:order-[1]"
        } order-[1]`}
        style={{ backgroundImage: `url(${src})` }}
      ></div>
      <div
        className={` ${
          invert ? "cat:order-[1]" : "cat:order-[2]"
        } order-[2] w-full h-full space-y-4 sm:space-y-0 sm:gap-[7.5%] cat:gap-[3%] flex flex-col text-left`}
      >
        <span className="flex flex-row gap-2">
          <IoRocketOutline size={20} color="green" /> {tag.toUpperCase()}
        </span>
        <h4 className="text-[1.75rem] leading-9 sm:text-[2.25rem] sm:leading-10 font-bold">
          {title}
        </h4>
        <p className="text-lg sm:text-xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default ImageText;
