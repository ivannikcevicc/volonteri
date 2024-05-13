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
    cityName,
    lat,
    lng,
    countryName,
    flag,
    organizationName,
    postLink,
    email,
    phoneNumber,
    organizationLink,
    peopleCount,
    imageSrc,
    title,
    description,
  } = body;

  const listing = await prismadb.job.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      cityName,
      lat,
      lng,
      countryName,
      flag,
      organizationName,
      postLink,
      email,
      phoneNumber,
      organizationLink,
      userId: currentUser.id,
      peopleCount: peopleCount,
    },
  });

  return NextResponse.json(listing);
}
