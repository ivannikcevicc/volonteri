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
import { InformationModal } from "../components/modals/InformationModal";
import { useInformationModal } from "../hooks/useInformationModal";

interface Props {
  jobs: Job[];
  currentUser?: SafeUser | null;
}
export const MyJobsClient = ({ jobs, currentUser }: Props) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const informationModal = useInformationModal();

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
  const onOpen = useCallback(
    async (id: string) => {
      informationModal.onOpen();
      setCurrentId(id);
    },
    [informationModal]
  );
  return (
    <Container>
      <Heading title="Poslovi" subtitle="Lista vaših poslova." />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <InformationModal
          jobId={currentId}
          actionLabel="Zatvori"
          title="Posao"
          subtitle="Informacije o poslu"
        />
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            data={job}
            actionId={job.id}
            onAction={onCancel}
            secondaryAction={onOpen}
            secondaryActionLabel="Pogledaj objavu"
            disabled={deletingId === job.id}
            actionLabel="Obrišite objavu"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
