import { EmptyState } from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteJobs from "../actions/getFavoriteJobs";
import FavoritesClient from "./FavoritesClient";
const ListingPage = async () => {
  const jobs = await getFavoriteJobs();
  const currentUser = await getCurrentUser();

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite jobs."
      ></EmptyState>
    );
  }
  //@ts-ignore
  return <FavoritesClient jobs={jobs} currentUser={currentUser} />;
};

export default ListingPage;
