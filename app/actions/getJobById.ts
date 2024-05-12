import prismadb from "../libs/prismadb";

interface Props {
  listingId: string;
}

export default async function getJobById(params: Props) {
  try {
    const { listingId: jobId } = params;

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
      },
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
