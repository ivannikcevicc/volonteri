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
    title,
    description,
    imageSrc,
    category,
    createdAt,
    jobTime,
    people,
    location,
  } = body;

  const listing = await prismadb.job.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      locationValue: location.value,
      userId: currentUser.id,
      createdAt,
      jobTime,
      peopleCount: people,
    },
  });

  return NextResponse.json(listing);
}
