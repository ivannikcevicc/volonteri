import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const {
    category,
    location,
    peopleCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  const listing = await prismadb.job.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      locationValue: location.value,
      userId: currentUser.id,
      jobTime,
      peopleCount: peopleCount,
    },
  });

  return NextResponse.json(listing);
}
