import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = () => {
    informationModal.onClose();
  };

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
          <div>
            Email:{" "}
            <a
              href={`mailto:${application.email}`}
              className="text-blue-600 underline"
            >
              {application.email}
            </a>
          </div>
          <div>
            Telefon:{" "}
            <a
              href={`tel:${application.phoneNumber}`}
              className="text-blue-600 underline"
            >
              {application.phoneNumber}
            </a>
          </div>
          {application.fileUrl && (
            <div>
              CV:{" "}
              <a
                href={`${application.fileUrl}`}
                className="text-blue-600 underline"
              >
                {application.fileUrl}
              </a>
            </div>
          )}
          <hr />
          <div className="text-wrap break-words sm:text-base text-[.75rem]">
            Iskustvo: {application.expirience}
          </div>
          <div className="text-wrap break-words sm:text-base text-[.75rem]">
            O meni: {application.expirience}
          </div>
          <div>Datum prijave: {formatDate(application.createdAt)}</div>
        </>
      )}
      {job && (
        <>
          <div className="flex  flex-col gap-2">
            <div>Naslov: {job?.title}</div>
            <div className="flex items-center gap-2">
              Autor: {user?.name} <Avatar src={user?.image} />
            </div>
            <div>
              Mjesto: {job?.countryName}, {job?.cityName}
            </div>
            <div>Kategorija: {job?.category}</div>
          </div>
          <hr />
          <div>
            Link do objave:{" "}
            <a href={`${job.postLink}`} className="text-blue-600 underline">
              {job.postLink}
            </a>
          </div>
          <div>
            Link do organizacije:{" "}
            <a
              href={`${job.organizationLink}`}
              className="text-blue-600 underline"
            >
              {job.organizationLink}
            </a>
          </div>
          <div>
            Telefon:{" "}
            <a
              href={`tel:${job.phoneNumber}`}
              className="text-blue-600 underline"
            >
              {job.phoneNumber}
            </a>
          </div>
          <hr />
          <div className="text-wrap break-words sm:text-base text-[.75rem]">
            {" "}
            Opis: {job.description}
          </div>
          <div>Datum objave: {formatDate(job.createdAt)}</div>
        </>
      )}
    </div>
  );

  return (
    <Modal
      onClose={informationModal.onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      isOpen={informationModal.isOpen}
      title="Informacije"
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};
