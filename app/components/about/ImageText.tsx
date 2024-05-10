"use client";

import "./image-text.modules.scss";
import { IoRocketOutline } from "react-icons/io5";
import Tip from "./Tip";
import { Button } from "../button";

interface Props {
  title: string;
  src: string;
  subtitle?: string;
  tag?: string;
  invert?: boolean;
  buttonLabel?: string;
  onClick?: () => void;
}

const ImageText = ({
  title,
  subtitle,
  src,
  invert = false,
  tag = "Volonteri",
  buttonLabel,
  onClick,
}: Props) => {
  return (
    <div
      className={` pt-10 flex gap-[5%] h-[100vh] sm:h-[60vh] w-full cat:grid ${
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
          invert
            ? "cat:order-[1] pl-0 cat:pl-10 2xl:pl-[6rem]"
            : "cat:order-[2]"
        } order-[2] w-full h-full space-y-2 sm:space-y-1 sm:gap-[7.5%] cat:gap-[3%] flex flex-col text-left`}
      >
        <span className="flex flex-row gap-2">
          <IoRocketOutline size={20} color="green" /> {tag.toUpperCase()}
        </span>
        <h4 className="text-[1.75rem] leading-9 sm:text-[2.25rem] sm:leading-10 font-bold">
          {title}
        </h4>
        <p className="text-lg sm:text-xl">{subtitle}</p>
        <div className="flex flex-col sm:flex-row [&>*:nth-child(odd)]:pr-0 sm:[&>*:nth-child(odd)]:pr-10 [&>*:nth-child(even)]:pl-0 sm:[&>*:nth-child(even)]:pl-10 divide-y-2 sm:divide-x-2 sm:divide-y-0 divide-gray-400 py-0 sm:py-2">
          <div className="flex flex-col gap-2 font-semibold py-4">
            <Tip text="Lorem ipsum dolor" />
            <Tip text="Lorem ipsum dolor" />
          </div>
          <div className="flex flex-col gap-2 font-semibold py-4">
            <Tip text="Lorem ipsum dolor" />
            <Tip text="Lorem ipsum dolor" />
          </div>
        </div>
        {buttonLabel && onClick && (
          <Button label={buttonLabel} onClick={onClick} />
        )}
      </div>
    </div>
  );
};

export default ImageText;
