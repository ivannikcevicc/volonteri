import prismadb from "../libs/prismadb";

interface Props {
  jobId?: string;
}

export default async function getReviewsByJobId(params: Props) {
  try {
    const { jobId } = params;

    const reviews = await prismadb.review.findMany({
      where: {
        jobId: jobId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(reviews);
    return reviews;
  } catch (error: any) {
    throw new Error(error);
  }
}
