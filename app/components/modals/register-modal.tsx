"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import React from "react";
import { Modal } from "./modal";
import { Heading } from "../heading";
import { Input } from "../inputs/input";
import toast from "react-hot-toast";
import { Button } from "../button";
import { signIn } from "next-auth/react";
import { useLoginModal } from "@/app/hooks/useLoginModal";

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registracija uspješna!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Greška prilikom registracije");
      })
      .finally(() => setIsLoading(false));
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Dobrodošli u Volontere!" subtitle="Kreirajte nalog!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        requiredMsg="Email je obavezan."
        errorMsg="Unesite validnu email adresu"
      />
      <Input
        id="name"
        label="Ime"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/^[a-zA-Z0-9\s]+$/}
        requiredMsg="Ime je obavezno."
        errorMsg="Samo slova, brojevi i razmaci su dozvoljeni."
      />
      <Input
        id="password"
        type="password"
        label="Šifra"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
        requiredMsg="Šifra je obavezna."
        errorMsg="Samo slova, brojevi i razmaci su dozvoljeni."
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Nastavite sa Google-om"
        onClick={() => signIn("google")}
        icon={FcGoogle}
      ></Button>
      <Button
        outline
        label="Nastavite sa Github-om"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
      ></Button>
      <div className="text-neutral-600 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Već imate nalog?</div>
          <div
            onClick={toggle}
            className="font-semibold text-neutral-800 cursor-pointer hover:underline"
          >
            Prijava
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registracija"
      actionLabel="Nastavi"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};
