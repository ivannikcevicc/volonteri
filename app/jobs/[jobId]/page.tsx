import getCurrentUser from "@/app/actions/getCurrentUser";
import getJobById from "@/app/actions/getJobById";
import { EmptyState } from "@/app/components/EmptyState";
import React, { useEffect } from "react";
import { JobClient } from "./JobClient";
import getApplicationsByJobId from "@/app/actions/getApplicationsByJobId";
interface Props {
  jobId: string;
}

const JobPage = async ({ params }: { params: Props }) => {
  const job = await getJobById(params);
  const applications = await getApplicationsByJobId(params);

  const currentUser = await getCurrentUser();
  if (!job) {
    return <EmptyState />;
  }
  return (
    <div>
      <JobClient job={job} currentUser={currentUser} applications={applications} />
    </div>
  );
};

export default JobPage;
