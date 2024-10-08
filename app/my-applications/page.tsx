import { EmptyState } from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getApplications from "../actions/getApplications";
import { MyApplicationsClient } from "./MyApplicationsClient";

const MyApplicationsPage = async () => {
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
        title="Nema prijava"
        subtitle="Izgleda da se nigdje niste prijavljivali."
      ></EmptyState>
    );
  }
  return (
    <MyApplicationsClient
      applications={applications}
      currentUser={currentUser}
    />
  );
};
export default MyApplicationsPage;
