"use client";

import React, { useMemo, useState } from "react";
import { Modal } from "./modal";
import { Heading } from "../heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { TextArea } from "../inputs/textarea";
import FileUpload from "../inputs/FileUpload";
import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useContactModal } from "@/app/hooks/useContactModal";

export const ContactModal = ({
  currentUser,
}: {
  currentUser: SafeUser | null;
}) => {
  const contactModal = useContactModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: `${currentUser?.name ? `${currentUser?.name}` : ""}`,
      email: `${currentUser?.email ? `${currentUser?.email}` : ""}`,
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/contact", {
        ...data,
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
        contactModal.onClose();
      });
  };
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Kontaktirajte nas"
        subtitle="Ispunite formu za kontakt. Očekujte odgovor u roku od 24-48 sati."
      />
      <Input
        id="name"
        label="Vaše ime"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/[\s\S]{0,20}/}
        requiredMsg="Ime je obavezno."
        errorMsg="Samo slova, brojevi i razmaci su dozvoljeni. Max. 20 oznaka."
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        requiredMsg="Email obavezan."
        errorMsg="Upišite validnu e-mail adresu."
      />
      <hr />
      <TextArea
        id="message"
        label="Poruka"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/[\s\S]{0,300}/}
        requiredMsg="Opis je obavezan."
        errorMsg="Upišite validan opis. (300 karaktera)"
      />
      <hr />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      onClose={contactModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={contactModal.isOpen}
      title="Kontaktirajte nas"
      actionLabel={"Pošalji"}
      body={bodyContent}
    ></Modal>
  );
};
