import prismadb from "../libs/prismadb";

interface Props {
  jobId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: Props) {
  try {
    const { jobId, userId, authorId } = params;
    const query: any = {};

    if (jobId) {
      query.jobId = jobId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.job = { userId: authorId };
    }

    const applications = await prismadb.application.findMany({
      where: query,
      include: {
        job: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(applications);
    return applications;
  } catch (error: any) {
    throw new Error(error);
  }
}
