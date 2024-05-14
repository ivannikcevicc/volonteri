import getCurrentUser from "@/app/actions/getCurrentUser";
import getJobById from "@/app/actions/getJobById";
import { EmptyState } from "@/app/components/EmptyState";
import React, { useEffect } from "react";
import { JobClient } from "./JobClient";
interface Props {
  jobId: string;
}

const JobPage = async ({ params }: { params: Props }) => {
  const job = await getJobById(params);

  const currentUser = await getCurrentUser();
  if (!job) {
    return <EmptyState />;
  }
  return (
    <div>
      <JobClient job={job} currentUser={currentUser} />
    </div>
  );
};

export default JobPage;
