"use client";
import { LocationValue, SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import { Avatar } from "../avatar";
import { JobCategory } from "./JobCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map"), {
  ssr: false,
});

interface Props {
  user: SafeUser;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: LocationValue;
  required?: string | null;
}

export const JobInfo = ({
  user,
  description,
  category,
  locationValue,
  required,
}: Props) => {
  let coordinates: any = undefined;
  if (locationValue) {
    coordinates = [locationValue?.lat, locationValue?.lng];
  }
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Objava od: {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500"></div>
      </div>
      <hr />
      {category && (
        <JobCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="flex flex-col gap-4">
        <div className="font-semibold text-xl">Opis posla:</div>
        <div className="text-lg font-light text-neutral-500">{description}</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="font-semibold text-xl">Prijava:</div>
        <div className="text-lg font-light text-neutral-500">{required}</div>
      </div>

      <hr />
      <Map center={coordinates} />
    </div>
  );
};
