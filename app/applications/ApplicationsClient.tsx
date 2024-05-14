"use client";

import React, { useEffect } from "react";

import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeApplication, SafeUser } from "../types";
import { Heading } from "../components/heading";
import Container from "../components/container";
import { ListingCard } from "../components/listings/ListingCard";
import { Application, Job } from "@prisma/client";
interface Props {
  applications: (Application & { job: Job })[];
  currentUser?: SafeUser | null;
}

export const ApplicationsClient = ({ applications, currentUser }: Props) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/applications/${id}`)
        .then(() => {
          toast.success("application deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error deleting application");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Applications" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {applications.map((application) => (
          <ListingCard
            key={application.id}
            data={application.job}
            application={application}
            actionId={application.id}
            onAction={onCancel}
            disabled={deletingId === application.id}
            actionLabel="Cancel guest application"
            currentUser={currentUser}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};
