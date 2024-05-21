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
import { useInformationModal } from "../hooks/useInformationModal";
import { InformationModal } from "../components/modals/InformationModal";

interface Props {
  applications: (Application & { job: Job })[];
  currentUser?: SafeUser | null;
}
export const MyApplicationsClient = ({ applications, currentUser }: Props) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const informationModal = useInformationModal();

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

  const onOpen = useCallback(
    async (id: string) => {
      informationModal.onOpen();
      setCurrentId(id);
    },
    [informationModal]
  );
  return (
    <Container>
      <Heading
        title="Vaše prijave"
        subtitle="Poslovi na koje ste se prijavili."
      />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <InformationModal
          applicationId={currentId}
          actionLabel="Zatvori"
          title="Prijava"
          subtitle="Informacije o prijavi"
        />
        {applications.map((application) => (
          <JobCard
            key={application.id}
            application={application}
            data={application.job}
            actionId={application.id}
            onAction={onCancel}
            secondaryAction={onOpen}
            secondaryActionLabel="Pogledaj prijavu"
            disabled={deletingId === application.id}
            actionLabel="Otkaži prijavu"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
