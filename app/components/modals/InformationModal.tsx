import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "./modal";
import { Heading } from "../heading";
import { useInformationModal } from "@/app/hooks/useInformationModal";
import { Application, Job, User } from "@prisma/client";
import { Avatar } from "../avatar";

interface Props {
  actionLabel: string;
  title: string;
  subtitle: string;
  applicationId?: string;
  jobId?: string;
}

export const InformationModal: React.FC<Props> = ({
  actionLabel,
  title,
  subtitle,
  applicationId,
  jobId,
}) => {
  const informationModal = useInformationModal();
  const [application, setApplication] = useState<Application | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (applicationId) {
        try {
          const response = await axios.get<Application>(
            `/api/applications/${applicationId}`
          );
          setApplication(response.data);
        } catch (error) {
          console.error("Error fetching application data:", error);
        }
      }

      if (jobId) {
        try {
          const response = await axios.get<Job>(`/api/jobs/${jobId}`);
          setJob(response.data);
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      }

      if (application?.userId || job?.userId) {
        let id = "";
        if (application?.userId) {
          id = application?.userId;
        }

        if (job?.userId) {
          id = job?.userId;
        }
        try {
          const response = await axios.get<User>(`/api/user/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [applicationId, jobId, application?.userId, job?.userId]);

  const onSubmit = () => {};

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  let bodyContent = (
    <div className="flex flex-col gap-3 overflow-y-auto">
      <Heading title={title} subtitle={subtitle} />
      {application && (
        <>
          <div className="flex items-center gap-2">
            Ime: {user?.name || application.name} <Avatar src={user?.image} />
          </div>
          <div>Email: {user?.email || application.email}</div>
          <div>Telefon: {application.phoneNumber}</div>
          <hr />
          <div>Iskustvo: {application.expirience}</div>
          <div>O meni: {application.expirience}</div>
          <div>Datum prijave: {formatDate(application.createdAt)}</div>
        </>
      )}
      {job && <div>Job Details: {/* Render job details here */}</div>}
    </div>
  );

  return (
    <Modal
      onClose={informationModal.onClose}
      onSubmit={onSubmit}
      isOpen={informationModal.isOpen}
      title="Informacije"
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};
