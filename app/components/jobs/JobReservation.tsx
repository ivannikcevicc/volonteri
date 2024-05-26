"use client";

import { useCallback, useState } from "react";
import { Button } from "../button";
import { Application, Review } from "@prisma/client";
import { useReviewModal } from "@/app/hooks/useReviewModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Avatar } from "../avatar";
import { IoStar } from "react-icons/io5";

import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

interface Props {
  onSubmit: () => void;
  disabled?: boolean;
  reviewed?: boolean;
  jobId?: string;
  applications: Application[];
  peopleCount?: number;
  buttonLabel?: string;
  reviews: Review[];
  currentUser: SafeUser | null;
}

export const JobReservation = ({
  onSubmit,
  disabled,
  reviewed,
  applications,
  peopleCount,
  reviews,
  jobId,
  currentUser,
  buttonLabel = "Prijavi se",
}: Props) => {
  const reviewModal = useReviewModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const userId = currentUser?.id;

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  const removeReview = ({ userId }: { userId: string | undefined }): void => {
    if (!userId || typeof userId !== "string") {
      toast.error("Niste prijavljeni.");
      return;
    }

    setIsLoading(true);

    fetch(`/api/review`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, jobId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Prijava uklonjena!");
        router.refresh();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        toast.error("Greška prilikom uklanjanja recenzije");
      })
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          Traže/i se {peopleCount} osoba/e
        </div>
        <hr />
      </div>
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label={`${buttonLabel}`}
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        {applications.length} Prijava/e
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={true}
        pagination={{ clickable: true }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="">
            <div className="border-[1px] border-neutral-200 p-4 ">
              <div className="flex flex-row items-center gap-2 mb-2">
                <Avatar src={review.userImg} height={"30"} width={"30"} />{" "}
                {review.userName}
              </div>
              <div className="flex flex-row items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <IoStar
                    key={value}
                    color={value <= review.ratingNumber ? "orange" : "black"}
                    size={24}
                  />
                ))}
              </div>
              <div className="font-semibold text-lg mt-3">
                &quot;{review.description}&quot;
              </div>

              <div className="font-light text-md mt-1">
                - Posted: {formatDate(review.createdAt)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        disabled={isLoading}
        label={reviewed ? "Ukloni recenziju" : "Napiši recenziju"}
        onClick={() => {
          if (reviewed) {
            removeReview({ userId });
          } else {
            reviewModal.onOpen();
          }
        }}
      />
    </div>
  );
};
