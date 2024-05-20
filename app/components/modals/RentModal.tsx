"use client";

import React, { useMemo, useState } from "react";
import { Modal } from "./modal";
import { useRentModal } from "@/app/hooks/useRentModal";
import { Heading } from "../heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PiArrowsOutLineHorizontal } from "react-icons/pi";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  ORGANIZATION = 3,
  CONTACT = 4,
  IMAGES = 5,
  FORM = 6,
  REQUIRED = 7,
  DESCRIPTION = 8,
}

export const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: undefined,
      peopleCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
      organizationName: "",
      postLink: "",
      email: "",
      phoneNumber: "",
      formLink: "",
      required: "",
      organizationLink: "",
      flag: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const peopleCount = watch("peopleCount");
  const imageSrc = watch("imageSrc");
  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    //eslint-disable-next-line
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // const onSubmit = (data: FieldValues) => {
  //   console.log(data);
  //   rentModal.onClose();
  // };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post("/api/jobs", {
        ...data,
        cityName: data.location.cityName,
        countryName: data.location.countryName,
        lat: data.location.lat,
        lng: data.location.lng,
        jobTime: data.jobTime,
      })
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        /// resets the form in react-hook-form
        reset();

        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
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

  if (step === STEPS.LOCATION) {
    let mapCenter = undefined; // Default center if location is not available

    if (location && location.lat && location.lng) {
      mapCenter = [location.lat, location.lng]; // Use location's lat and lng if available
    }
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={mapCenter}></Map>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Broj volontera"
          subtitle="Koliki je maksimalan procjenjen broj volontera koje prihvatate za navedeni posao?"
        />
        <Counter
          title="Broj volontera"
          subtitle="Maksimalan procjenjen broj volontera"
          value={peopleCount}
          onChange={(value) => setCustomValue("peopleCount", value)}
        />
        <hr />
      </div>
    );
  }

  if (step === STEPS.ORGANIZATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Informacije o organizaciji"
          subtitle="Unesite validne informacije o organizaciji."
        />
        <hr />
        <Input
          id="organizationName"
          label="Ime organizacije"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^[a-zA-Z0-9\s]+$/}
          requiredMsg="Ime je obavezno."
          errorMsg="Slova, brojevi i razmaci su dozvoljeni."
        />
        <Input
          id="organizationLink"
          label="Link od organizacije (websajt, drustvene mreze...)"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^https?:\/\/.+$/}
          requiredMsg="Link je obavezan."
          errorMsg="Unesite validan link."
        />
        <Input
          id="postLink"
          label="Link od objave posla na eksternoj platformi"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^https?:\/\/.+$/}
          requiredMsg="Link je obavezan."
          errorMsg="Unesite validan link."
        />
      </div>
    );
  }
  if (step === STEPS.CONTACT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Kontakt informacije"
          subtitle="Gdje volonteri mogu da vas nađu?"
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
          requiredMsg="Email je obavezan."
          errorMsg="Molimo vas unesite validnu email adresu."
        />
        <Input
          id="phoneNumber"
          label="Broj telefona"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,13}/}
          requiredMsg="Broj telefona je obavezan."
          errorMsg="Molimo vas unesite validan broj telefona. Pokušajte (+123 12 312 312) format"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Dodajte slike vašeg posla"
          subtitle="Slike od prijašnjih dogadjaja i organizacija ili slično."
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }
  if (step === STEPS.FORM) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Link do online forme za prijavu (opcionalno)"
          subtitle="Za one koji prijave prihvataju preko online formi."
        />
        <Input
          id="formLink"
          label="Link do forme"
          disabled={isLoading}
          register={register}
          errors={errors}
          regex={/^https?:\/\/.+$/}
          requiredMsg="Link je obavezan."
          errorMsg="Unesite validan link."
        />
      </div>
    );
  }
  if (step === STEPS.REQUIRED) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Obavezne informacije za prijavu."
          subtitle="Navedite šta sve korisnici moraju da navedu u poruci za prijavu."
        />
        <Input
          id="required"
          label="Opis"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/[\s\S]{0,300}/}
          requiredMsg="Opis je obavezan."
          errorMsg="Unesite validan opis.(300 karaktera)"
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Naslov posla"
          subtitle="Kratko i jasno služi najbolje."
        />
        <Input
          id="title"
          label="Naslov"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^[a-zA-Z0-9\s]+$/}
          requiredMsg="Naslov je obavezan."
          errorMsg="Please enter a valid title."
        />
        <hr />
        <Input
          id="description"
          label="Opis"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/[\s\S]{0,300}/}
          requiredMsg="Opis je obavezan."
          errorMsg="Unesite validan opis. (300 karaktera)"
        />
      </div>
    );
  }

  return (
    <Modal
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      title="Post your Job!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    ></Modal>
  );
};
