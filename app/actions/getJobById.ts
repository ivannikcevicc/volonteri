import prismadb from "../libs/prismadb";

interface Props {
  jobId: string;
}

export default async function getJobById(params: Props) {
  try {
    const { jobId: jobId } = params;

    const job = await prismadb.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        user: true,
      },
    });

    if (!job) {
      return null;
    }

    return {
      ...job,
      user: {
        ...job.user,
        emailVerified: job.user.emailVerified?.toISOString() || null,
        createdAt: job.user.createdAt.toISOString(),
        updatedAt: job.user.updatedAt.toISOString(),
      },
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
