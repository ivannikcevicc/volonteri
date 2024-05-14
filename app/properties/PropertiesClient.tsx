"use client";

import React, { useCallback, useState } from "react";
import { SafeUser } from "../types";
import Container from "../components/container";
import { Heading } from "../components/heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { JobCard } from "../components/jobs/JobCard";
import { Job } from "@prisma/client";

interface Props {
  jobs: Job[];
  currentUser?: SafeUser | null;
}
export const PropertiesClient = ({ jobs, currentUser }: Props) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/jobs/${id}`)
        .then(() => {
          toast.success(`Job deleted.`);
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            data={job}
            actionId={job.id}
            onAction={onCancel}
            disabled={deletingId === job.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
