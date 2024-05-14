"use client";

import Container from "@/app/components/container";
import { JobHead } from "@/app/components/jobs/JobHead";
import { JobInfo } from "@/app/components/jobs/JobInfo";
import { JobReservation } from "@/app/components/jobs/JobReservation";
import { categories } from "@/app/components/navbar/Categories";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { Job } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  job: Job & {
    user: SafeUser;
  };
  // job: any;
  currentUser: SafeUser | null;
  // currentUser: any;
}

export const JobClient = ({ job, currentUser }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/applications", {
        jobId: job.id,
      })
      .then(() => {
        toast.success("Job application submitted!");
        //redirect to /trips
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, job.id, loginModal, router]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === job.category);
  }, [job.category]);

  const locationValue = {
    cityName: job.cityName,
    countryName: job.countryName,
    lat: job.lat,
    lng: job.lng,
    flag: job.flag,
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <JobHead
            title={job.title}
            imageSrc={job.imageSrc}
            locationValue={locationValue}
            id={job.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <JobInfo
              user={job.user}
              category={category}
              description={job.description}
              locationValue={locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <JobReservation
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
