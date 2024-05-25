"use client";

import { useCallback } from "react";
import { Button } from "../button";
import { Application, Review } from "@prisma/client";
import { useReviewModal } from "@/app/hooks/useReviewModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Avatar } from "../avatar";
import { IoStar } from "react-icons/io5";

interface Props {
  onSubmit: () => void;
  disabled?: boolean;
  jobId?: string;
  applications: Application[];
  peopleCount?: number;
  buttonLabel?: string;
  reviews: Review[];
}

export const JobReservation = ({
  onSubmit,
  disabled,
  applications,
  peopleCount,
  reviews,
  buttonLabel = "Prijavi se",
}: Props) => {
  const reviewModal = useReviewModal();

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
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
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
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

        {/* <SwiperSlide>
          <Image alt="User image" src={review}></Image>
        </SwiperSlide>
        <SwiperSlide>bbbbbbbbb</SwiperSlide>
        <SwiperSlide>ccccccccccc</SwiperSlide>
        <SwiperSlide>ddddddddd</SwiperSlide> */}
      </Swiper>
      <Button
        disabled={false}
        label={`Napisi recenziju`}
        onClick={() => {
          reviewModal.onOpen();
        }}
      />
    </div>
  );
};
