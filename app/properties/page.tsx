import { EmptyState } from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getJobs from "../actions/getJobs";
import { PropertiesClient } from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
    );
  }

  const jobs = await getJobs({ userId: currentUser.id });

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties yet"
      ></EmptyState>
    );
  }
  return <PropertiesClient jobs={jobs} currentUser={currentUser} />;
};
export default PropertiesPage;
