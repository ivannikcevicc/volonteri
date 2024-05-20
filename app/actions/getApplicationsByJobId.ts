import prismadb from "../libs/prismadb";

interface Props {
  jobId?: string;
}

export default async function getApplicationsByJobId(params: Props) {
  try {
    const { jobId } = params;

    const applications = await prismadb.application.findMany({
      where: {
        jobId: jobId,
      },
      // include: {
      //   job: true,
      // },
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
