"use client";

import React from "react";

import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import { Heading } from "../components/heading";
import Container from "../components/container";
import { ListingCard } from "../components/listings/ListingCard";
interface Props {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

export const ReservationsClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error deleting reservation");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};
