import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const AboutHeading = ({
  title,
  subtitle,
  center = false,
  className,
}: Props) => {
  return (
    <div
      className={`flex flex-col  ${
        center && "max-w-[90%] cat:max-w-[900px] mx-auto"
      } text-center align-center justify-center gap-4  ${className} `}
    >
      <h3 className="text-2xl">{title}</h3>
      {subtitle && (
        <p className="text-lg text-wrap text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default AboutHeading;
