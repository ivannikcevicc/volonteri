"use client";

import React, { useMemo, useState } from "react";
import { Modal } from "./modal";
import { useApplicationModal } from "@/app/hooks/useApplicationModal";
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

enum STEPS {
  CREDS = 0,
  EXPIRIENCE = 1,
  ABOUT = 2,
  CV = 3,
}

export const ApplicationModal = () => {
  const applicationModal = useApplicationModal();
  const [step, setStep] = useState(STEPS.CREDS);
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
      name: "",
      email: "",
      phoneNumber: "",
      expirience: "",
      about: "",
      fileUrl: "",
    },
  });
  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.CV) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post("/api/applications", {
        ...data,
        jobId: pathname?.split("/").pop(),
      })
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        /// resets the form in react-hook-form
        reset();
        console.log(data);

        setStep(STEPS.CREDS);
        applicationModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CV) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CREDS) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Šta od navedenog najbolje opisuje posao?"
        subtitle="Izaberi kategoriju"
      ></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.CREDS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Kontakt informacije"
          subtitle="Gdje poslodavci mogu da vas kontaktiraju."
        />
        <Input
          id="name"
          label="Vaše ime"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^[a-zA-Z0-9\s]+$/}
          requiredMsg="Ime je obavezno."
          errorMsg="Samo slova, brojevi i razmaci su dozvoljeni."
        />
        <hr />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          requiredMsg="Email obavezan."
          errorMsg="Upišite validnu e-mail adresu"
        />
        <Input
          id="phoneNumber"
          label="Broj telefona"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,13}/}
          requiredMsg="Broj telefona je obavezan"
          errorMsg="Unesite ispravan broj telefona. Pokušajte da upišete + format"
        />
      </div>
    );
  }
  if (step === STEPS.EXPIRIENCE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Vaše iskustvo"
          subtitle="Vaše prijašnje iskustvo sa volonterskim poslovanjem."
        />
        <TextArea
          id="expirience"
          label="Opis"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/[\s\S]{0,300}/}
          requiredMsg="Iskustvo je obavezno."
          errorMsg="Upišite validno iskustvo. (300 karaktera)"
        />
      </div>
    );
  }

  if (step === STEPS.ABOUT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="O vama"
          subtitle="Navedite neke informacije o vama i vašem ličnom životu."
        />
        <TextArea
          id="about"
          label="O vama"
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
  }

  if (step === STEPS.CV) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="CV (Opcionalno)"
          subtitle="Dodajte CV ukoliko ga imate."
        />
        <FileUpload setValue={setValue} />
        <hr />
      </div>
    );
  }

  return (
    <Modal
      onClose={applicationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={applicationModal.isOpen}
      title="Post your Job!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CV ? undefined : onBack}
      body={bodyContent}
    ></Modal>
  );
};
