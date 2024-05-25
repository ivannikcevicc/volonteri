"use client";

import React, { useMemo, useState } from "react";
import { Modal } from "./modal";
import { Heading } from "../heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { TextArea } from "../inputs/textarea";
import { SafeUser } from "@/app/types";
import { useContactModal } from "@/app/hooks/useContactModal";
import { IoStar } from "react-icons/io5";
import { useReviewModal } from "@/app/hooks/useReviewModal";

export const ReviewModal = ({
  currentUser,
}: {
  currentUser: SafeUser | null;
}) => {
  const reviewModal = useReviewModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [rating, setRating] = useState(0);

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue("ratingNumber", value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      description: ``,
      ratingNumber: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/review", {
        ...data,
        jobId: pathname?.split("/")[2],
        userId: currentUser?.id,
        userName: currentUser?.name,
        userImg: currentUser?.image,
      })
      .then(() => {
        toast.success("Poslato!");
        router.refresh();
        reset();
        console.log(data);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
        reviewModal.onClose();
      });
  };
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Recenzija" subtitle="Ispunite formu za recenziju." />
      <div className="flex  justify-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <IoStar
            key={value}
            color={value <= rating ? "orange" : "black"}
            size={24}
            onClick={() => handleRatingClick(value)}
            className="cursor-pointer"
          />
        ))}
      </div>

      <hr />
      <TextArea
        id="description"
        label="Opis"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/[\s\S]{0,100}/}
        requiredMsg="Opis je obavezan."
        errorMsg="Upišite validan opis. (max.100 karaktera)"
      />
      <hr />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      onClose={reviewModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={reviewModal.isOpen}
      title="Recenzija"
      actionLabel={"Pošalji"}
      body={bodyContent}
    ></Modal>
  );
};
