import prismadb from "../libs/prismadb";

export interface JobProps {
  userId?: string;
  peopleCount?: number;
  jobTime?: string;
  locationValue?: string;
  category?: string;
}

export default async function getJobs(params: JobProps) {
  try {
    const { userId, peopleCount, jobTime, locationValue, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (peopleCount) {
      query.peopleCount = {
        //transforms peoplecount to number
        gte: +peopleCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    const jobs = await prismadb.job.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeJobs = jobs.map((job) => ({
      ...job,
      createdAt: job.createdAt.toISOString(),
    }));

    return safeJobs;
  } catch (err: any) {
    throw new Error(err);
  }
}
