import getCurrentUser from "./actions/getCurrentUser";
import getJobs, { JobProps } from "./actions/getJobs";
import { EmptyState } from "./components/EmptyState";
import SearchHome from "./components/SearchHome";
import { JobCard } from "./components/jobs/JobCard";
import { Categories } from "./components/navbar/Categories";
export const dynamic = "force-dynamic";

interface Props {
  searchParams: JobProps;
}
const Home = async ({ searchParams }: Props) => {
  const jobs = await getJobs(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <>
      <SearchHome />
      <div className="cat:grid cat:grid-cols-[15fr,90fr] justify-center bg-gradient-to-t from-white to-gray-100">
        <Categories />

        <div className="container cat:p-0">
          {jobs.length === 0 ? (
            <EmptyState showReset />
          ) : (
            <div className="pt-2 px-[5%] overflow-y-auto cat:h-[59vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
              {jobs.map((job) => {
                return (
                  <JobCard key={job.id} currentUser={currentUser} data={job} />
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
