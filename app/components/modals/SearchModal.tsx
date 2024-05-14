"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Modal } from "./modal";
import useSearchModal from "@/app/hooks/useSearchModal copy";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { CountrySelect, CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { Heading } from "../heading";
enum STEPS {
  LOCATION = 0,
}
const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [location, setLocation] = useState<CountrySelectValue>();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.LOCATION) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      cityName: location?.cityName,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [step, searchModal, location, router, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let center: any = undefined;

  if (location) {
    center = [location?.lat, location?.lng];
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle={"Find the perfect location"}
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={center} />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    ></Modal>
  );
};

export default SearchModal;
