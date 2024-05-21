import { EmptyState } from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getJobs from "../actions/getJobs";
import { MyJobsClient } from "./MyJobsClient";

const MyJobsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Niste prijavljeni"
        subtitle="Molimo vas, prijavite se"
      ></EmptyState>
    );
  }

  const jobs = await getJobs({ userId: currentUser.id });

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="Nema objavljenih poslova"
        subtitle="Izgleda da niste objavljivali poslove."
      ></EmptyState>
    );
  }
  return <MyJobsClient jobs={jobs} currentUser={currentUser} />;
};
export default MyJobsPage;
