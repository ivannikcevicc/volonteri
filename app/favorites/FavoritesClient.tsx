import React from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/container";
import { Heading } from "../components/heading";
import { ListingCard } from "../components/listings/ListingCard";
interface Props {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}
const FavoritesClient = ({ listings, currentUser }: Props) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite places!" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            currentUser={currentUser}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
