import getCurrentUser from "@/app/actions/getCurrentUser";
import getJobById from "@/app/actions/getJobById";
import { EmptyState } from "@/app/components/EmptyState";
import React, { useEffect } from "react";
import { ListingClient } from "./ListingClient";
interface Props {
  listingId: string;
}

const ListingPage = async ({ params }: { params: Props }) => {
  const listing = await getJobById(params);

  const currentUser = await getCurrentUser();
  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
};

export default ListingPage;
