import React from "react";
import { SafeJob, SafeUser } from "../types";
import Container from "../components/container";
import { Heading } from "../components/heading";
import { JobCard } from "../components/jobs/JobCard";
import { Job } from "@prisma/client";
interface Props {
  jobs: Job[];
  currentUser?: SafeUser | null;
}
const FavoritesClient = ({ jobs, currentUser }: Props) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite places!" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {jobs.map((job) => (
          <JobCard data={job} currentUser={currentUser} key={job.id} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
