import React, { FC } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface Props {
  text: string;
}
const Tip: FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <IoIosCheckmarkCircle color="green" size={25} />
      {text}
    </div>
  );
};

export default Tip;
