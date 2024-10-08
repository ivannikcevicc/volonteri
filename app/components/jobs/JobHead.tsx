"use client";

import useCountries from "@/app/hooks/useCountries";
import { LocationValue, SafeUser } from "@/app/types";
import React from "react";
import { Heading } from "../heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";
interface Props {
  title: string;
  locationValue: LocationValue;
  imageSrc: string;
  id: string;
  currentUser: SafeUser | null;
}

export const JobHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: Props) => {
  const location = locationValue;
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.countryName}, ${location?.cityName}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton jobId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
