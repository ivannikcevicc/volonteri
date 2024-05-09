import getCurrentUser from "./actions/getCurrentUser";
import getListings, { ListingProps } from "./actions/getListings";
import { EmptyState } from "./components/EmptyState";
import SearchHome from "./components/SearchHome";
import { ListingCard } from "./components/listings/ListingCard";
import { Categories } from "./components/navbar/Categories";
export const dynamic = "force-dynamic";

interface Props {
  searchParams: ListingProps;
}
const Home = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <>
      <SearchHome />
      <div className="cat:grid cat:grid-cols-[15fr,90fr] justify-center bg-gradient-to-t from-white to-gray-100">
        <Categories />

        <div className="container cat:p-0">
          {listings.length === 0 ? (
            <EmptyState showReset />
          ) : (
            <div className="pt-2 px-[5%] overflow-y-auto cat:h-[59vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
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
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
