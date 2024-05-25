"use client";
import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { SafeApplication, SafeUser } from "@/app/types";
import { HeartButton } from "../HeartButton";
import { Button } from "../button";
import { Application, Job } from "@prisma/client";
import { Span } from "next/dist/trace";

interface Props {
  data: Job;
  application?: Application & { job: Job };
  onAction?: (id: string) => void;
  secondaryAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  secondaryActionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export const JobCard = ({
  data,
  onAction,
  disabled,
  actionLabel,
  secondaryActionLabel,
  secondaryAction,
  actionId = "",
  currentUser,
}: Props) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      secondaryAction?.(actionId);
    },
    [secondaryAction, actionId, disabled]
  );
  return (
    <div
      onClick={() => router.push(`jobs/${data.id}`)}
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
              jobId={data.id}
              currentUser={currentUser}
            ></HeartButton>
          </div>

          <div className="absolute bottom-3 right-3">
            {currentUser?.id === data.userId && (
              <span className="py-[0rem] px-[.6rem] text-[.8rem] rounded-full bg-green-500 text-white">
                Vaše
              </span>
            )}
          </div>
        </div>
        <div className="font-semibold text-lg flex flex-row gap-2">
          {data.title}{" "}
        </div>
        <div className="flex flex-row items-center gap-1">
          {data.cityName}, {data.countryName}{" "}
        </div>
        {secondaryAction && secondaryActionLabel && (
          <Button
            disabled={disabled}
            small
            label={secondaryActionLabel}
            onClick={handleSubmit}
          />
        )}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            outline
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
