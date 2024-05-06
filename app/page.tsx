import getCurrentUser from "./actions/getCurrentUser";
import getListings, { ListingProps } from "./actions/getListings";
import { EmptyState } from "./components/EmptyState";
import Container from "./components/container";
import { ListingCard } from "./components/listings/ListingCard";
import { Categories } from "./components/navbar/Categories";
export const dynamic = "force-dynamic";

interface Props {
  searchParams: ListingProps;
}
const Home = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <div className="grid grid-cols-[20fr,80fr] max-w-full">
      <Categories />
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {listings.map((listing: any) => {
            return (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default Home;
