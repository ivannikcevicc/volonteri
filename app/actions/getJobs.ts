// import prismadb from "../libs/prismadb";

// export interface JobProps {
//   userId?: string;
//   peopleCount?: number;
//   jobTime?: string;
//   locationValue?: string;
//   category?: string;
// }

// export default async function getJobs(params: JobProps) {
//   try {
//     const { userId, peopleCount, locationValue, category } = params;

//     let query: any = {};

//     if (userId) {
//       query.userId = userId;
//     }

//     if (category) {
//       query.category = category;
//     }

//     if (peopleCount) {
//       query.peopleCount = {
//         //transforms peoplecount to number
//         gte: +peopleCount,
//       };
//     }

//     if (locationValue) {
//       query.locationValue = locationValue;
//     }

//     const jobs = await prismadb.job.findMany({
//       where: {
//         locationValue: query.locationValue,
//         category: query.category,
//         peopleCount: query.peopleCount,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     const safeJobs = jobs.map((job) => ({
//       ...job,
//       createdAt: job.createdAt.toISOString(),
//     }));

//     return safeJobs;
//   } catch (err: any) {
//     throw new Error(err);
//   }
// }

import prismadb from "../libs/prismadb";
import { Prisma } from "@prisma/client";

export interface JobProps {
  userId?: string;
  peopleCount?: number;
  jobTime?: string;
  cityName?: string;
  category?: string;
}

export default async function getJobs(params: JobProps) {
  try {
    const { userId, peopleCount, cityName, category } = params;

    let where: Prisma.JobWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (category) {
      where.category = category;
    }

    if (peopleCount) {
      where.peopleCount = {
        gte: peopleCount,
      };
    }

    if (cityName) {
      where.cityName = cityName;
    }

    console.log(where);

    const jobs = await prismadb.job.findMany({
      where: {
        cityName: where.cityName,
        category: where.category,
      },
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
