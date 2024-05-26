"use client";

import Container from "@/app/components/container";
import { JobHead } from "@/app/components/jobs/JobHead";
import { JobInfo } from "@/app/components/jobs/JobInfo";
import { JobReservation } from "@/app/components/jobs/JobReservation";
import { categories } from "@/app/components/navbar/Categories";
import { useApplicationModal } from "@/app/hooks/useApplicationModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { Application, Job, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  job: Job & {
    user: SafeUser;
  };
  reviews: Review[];
  currentUser: SafeUser | null;
  applications: Application[];
}

export const JobClient = ({
  job,
  currentUser,
  applications,
  reviews,
}: Props) => {
  const applicationModal = useApplicationModal();
  const router = useRouter();
  const loginModal = useLoginModal();
  const [applied, setApplied] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Prijavi se");

  const category = useMemo(() => {
    return categories.find((item) => item.label === job.category);
  }, [job.category]);

  useEffect(() => {
    if (currentUser) {
      const hasApplied = applications.some(
        (application) => application.userId === currentUser.id
      );
      setApplied(hasApplied);
      setButtonLabel("Već ste prijavljeni.");
    }

    if (currentUser && job.userId === currentUser.id) {
      setApplied(true);
      setButtonLabel("Vaša objava.");
    }

    if (currentUser) {
      const hasReviewed = reviews.some(
        (review) => review.userId === currentUser.id
      );
      setReviewed(hasReviewed);
    }
  }, [applications, currentUser, job.userId, reviews]);

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
              required={job.required}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <JobReservation
                onSubmit={() => {
                  if (!currentUser) return loginModal.onOpen();
                  applicationModal.onOpen();
                  setApplied(true);
                }}
                applications={applications}
                disabled={applied}
                reviewed={reviewed}
                jobId={job.id}
                currentUser={currentUser}
                reviews={reviews}
                buttonLabel={buttonLabel}
                peopleCount={job.peopleCount}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
