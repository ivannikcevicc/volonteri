import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

interface Props {
  reviewId?: string;
}

export async function GET(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { reviewId } = params;
  if (!reviewId || typeof reviewId !== "string") {
    throw new Error("Invalid ID");
  }

  const review = await prismadb.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  return NextResponse.json(review);
}
