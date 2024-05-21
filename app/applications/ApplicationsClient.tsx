"use client";

import React, { useEffect } from "react";

import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeApplication, SafeUser } from "../types";
import { Heading } from "../components/heading";
import Container from "../components/container";
import { JobCard } from "../components/jobs/JobCard";
import { Application, Job } from "@prisma/client";
import { InformationModal } from "../components/modals/InformationModal";
import { useInformationModal } from "../hooks/useInformationModal";
interface Props {
  applications: (Application & { job: Job })[];
  currentUser?: SafeUser | null;
}

export const ApplicationsClient = ({ applications, currentUser }: Props) => {
  const router = useRouter();
  const informationModal = useInformationModal();
  const [deletingId, setDeletingId] = useState("");
  const [currentId, setCurrentId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/applications/${id}`)
        .then(() => {
          toast.success("Prijava obrisana");
          router.refresh();
        })
        .catch(() => {
          toast.error("Greška prilikom brisanja");
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
      <Heading title="Prijave" subtitle="Prijave korisnika na vaše poslove" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <InformationModal
          applicationId={currentId}
          actionLabel="Zatvori"
          title="Prijava"
          subtitle="Informacije o prijavi"
        />
        {applications.map((application) => (
          <JobCard
            key={application.id}
            data={application.job}
            application={application}
            actionId={application.id}
            onAction={onCancel}
            secondaryAction={onOpen}
            secondaryActionLabel="Pogledaj prijavu"
            disabled={deletingId === application.id}
            actionLabel="Odbij prijavu"
            currentUser={currentUser}
          ></JobCard>
        ))}
      </div>
    </Container>
  );
};
