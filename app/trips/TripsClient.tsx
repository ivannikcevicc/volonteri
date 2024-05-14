"use client";

import React, { useCallback, useState } from "react";
import { SafeUser } from "../types";
import Container from "../components/container";
import { Heading } from "../components/heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { JobCard } from "../components/jobs/JobCard";
import { Application, Job } from "@prisma/client";

interface Props {
  applications: (Application & { job: Job })[];
  currentUser?: SafeUser | null;
}
export const TripsClient = ({ applications, currentUser }: Props) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/applications/${id}`)
        .then(() => {
          toast.success(`applications cancelled.`);
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {applications.map((application) => (
          <JobCard
            key={application.id}
            application={application}
            data={application.job}
            actionId={application.id}
            onAction={onCancel}
            disabled={deletingId === application.id}
            actionLabel="Cancel application"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
