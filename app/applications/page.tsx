import { EmptyState } from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import { ApplicationsClient } from "./ApplicationsClient";
import getApplications from "../actions/getApplications";
import { useCallback, useState } from "react";

const ApplicationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Niste prijavljeni"
        subtitle="Molimo vas da se prijavite."
      />
    );
  }

  const applications = await getApplications({
    authorId: currentUser.id,
  });

  if (applications.length === 0) {
    return (
      <EmptyState
        title="Nema prijava."
        subtitle="Izgleda da se nigdje niste prijavili."
      />
    );
  }

  return (
    <ApplicationsClient applications={applications} currentUser={currentUser} />
  );
};
export default ApplicationsPage;
