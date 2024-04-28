import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { EmptyState } from "@/app/components/EmptyState";
import React from "react";
import { ListingClient } from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface Props {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Props }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div>
      <ListingClient
        reservations={reservations}
        listing={listing}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ListingPage;
