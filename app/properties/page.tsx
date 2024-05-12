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

  const listings = await getJobs({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties yet"
      ></EmptyState>
    );
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};
export default PropertiesPage;
