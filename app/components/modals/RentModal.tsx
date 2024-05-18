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
  DESCRIPTION = 6,
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
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Volunteers"
          subtitle="How many volunteers do you allow?"
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
          title="Organization Information"
          subtitle="Provide valid data about your organization."
        />
        <hr />
        <Input
          id="organizationName"
          label="Organization Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^[a-zA-Z0-9\s]+$/}
          requiredMsg="Organization name is required."
          errorMsg="Only letters, numbers and spaces allowed"
        />
        <Input
          id="organizationLink"
          label="Link to the organization"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^https?:\/\/.+$/}
          requiredMsg="Link to the organization is required."
          errorMsg="Please enter a valid URL"
        />
        <Input
          id="postLink"
          label="Link to the post"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^https?:\/\/.+$/}
          requiredMsg="Link to an external post is required."
          errorMsg="Please enter a valid URL"
        />
      </div>
    );
  }
  if (step === STEPS.CONTACT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Contact Information"
          subtitle="Where volunteers can reach you."
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
          requiredMsg="Email is required."
          errorMsg="Please enter a valid email address"
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,13}/}
          requiredMsg="Phone Number is required."
          errorMsg="Please enter a valid phone number. Try the + operator"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/^[a-zA-Z0-9\s]+$/}
          requiredMsg="Title is required."
          errorMsg="Please enter a valid title."
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          regex={/[\s\S]*/}
          requiredMsg="Description is required."
          errorMsg="Please enter a valid description."
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
