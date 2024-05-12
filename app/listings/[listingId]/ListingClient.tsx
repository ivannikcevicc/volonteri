"use client";

import Container from "@/app/components/container";
import { ListingHead } from "@/app/components/listings/ListingHead";
import { ListingInfo } from "@/app/components/listings/ListingInfo";
import { ListingReservation } from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  // listing: Job & {
  //   user: SafeUser;
  // };
  listing: any;
  // currentUser: SafeUser | null;
  currentUser: any;
}

export const ListingClient = ({ listing, currentUser }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        //redirect to /trips
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listing?.id, currentUser, router, loginModal]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const locationValue = {
    cityName: listing.cityName,
    countryName: listing.countryName,
    lat: listing.lat,
    lng: listing.lng,
    flag: listing.flag,
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              locationValue={locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                onSubmit={onCreateReservation}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
