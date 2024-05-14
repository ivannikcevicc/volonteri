import { EmptyState } from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getApplications from "../actions/getApplications";
import { TripsClient } from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
    );
  }

  const applications = await getApplications({ userId: currentUser.id });

  if (applications.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't made any trips yet"
      ></EmptyState>
    );
  }
  return <TripsClient applications={applications} currentUser={currentUser} />;
};
export default TripsPage;
