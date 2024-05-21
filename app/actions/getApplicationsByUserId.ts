import prismadb from "../libs/prismadb";

interface Props {
  userId?: string;
}

export default async function getApplicationsByUserId(params: Props) {
  try {
    const { userId } = params;

    const applications = await prismadb.application.findMany({
      where: {
        userId: userId,
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
