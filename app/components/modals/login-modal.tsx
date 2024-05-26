"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import * as auth from "next-auth/react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import React from "react";
import { Modal } from "./modal";
import { Heading } from "../heading";
import { Input } from "../inputs/input";
import toast from "react-hot-toast";
import { Button } from "../button";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

export const LoginModal = () => {
  const router = useRouter();
  const LoginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    auth
      .signIn("credentials", {
        ...data,
        redirect: false,
      })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success("Uspješna prijava");
          router.refresh();
          LoginModal.onClose();
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
  };

  const toggle = useCallback(() => {
    LoginModal.onClose();
    registerModal.onOpen();
  }, [LoginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log in to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        requiredMsg="Email is required."
        errorMsg="Please enter a valid email address"
      />
      <Input
        id="password"
        type="password"
        label="Šifra"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/[\s\S]*/}
        requiredMsg="Password is required."
        errorMsg="Please enter a valid password."
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Nastavite sa Google-om"
        onClick={() => auth.signIn("google")}
        icon={FcGoogle}
      ></Button>
      <Button
        outline
        label="Nastavite sa Github-om"
        onClick={() => auth.signIn("github")}
        icon={AiFillGithub}
      ></Button>
      <div className="text-neutral-600 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Prvi put da koristite Volontere?</div>
          <div
            onClick={toggle}
            className="font-semibold text-neutral-800 cursor-pointer hover:underline"
          >
            Kreirajte nalog
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Prijava"
      actionLabel="Nastavi"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};
