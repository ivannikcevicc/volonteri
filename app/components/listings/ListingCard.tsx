"use client";
import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { SafeApplication, SafeUser } from "@/app/types";
import { HeartButton } from "../HeartButton";
import { Button } from "../button";
import { Application, Job } from "@prisma/client";

interface Props {
  data: Job;
  application?: Application & { job: Job };
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export const ListingCard = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: Props) => {
  const router = useRouter();
  console.log(data);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );
  return (
    <div
      onClick={() => router.push(`listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            ></HeartButton>
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.cityName}, {data.countryName}
        </div>
        <div className="flex flex-row items-center gap-1">aaaaaaaaaaa</div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
