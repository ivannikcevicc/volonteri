import { EmptyState } from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import { ApplicationsClient } from "./ApplicationsClient";
import getApplications from "../actions/getApplications";

const ApplicationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const applications = await getApplications({
    authorId: currentUser.id,
  });

  if (applications.length === 0) {
    return (
      <EmptyState
        title="No Applications found"
        subtitle="Looks like you haven't applied to anything"
      />
    );
  }

  return (
    <ApplicationsClient applications={applications} currentUser={currentUser} />
  );
};
export default ApplicationsPage;
