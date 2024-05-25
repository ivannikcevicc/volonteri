import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { description, ratingNumber, jobId, userName, userImg } = body;

  if (!description || !ratingNumber) {
    return NextResponse.json({ error: "Fale podaci." });
  }

  if (!Number.isInteger(ratingNumber)) {
    return NextResponse.json({ error: "Ocjena mora biti cijeli broj." });
  }

  if (ratingNumber < 1 || ratingNumber > 5) {
    return NextResponse.json({ error: "Ocjena mora biti između 1 i 5." });
  }

  const existingRating = await prismadb.review.findFirst({
    where: {
      userId: currentUser.id,
    },
  });

  if (existingRating) {
    return NextResponse.json({ error: "Veza je već prijavljena." });
  }

  if (description.length > 100) {
    return NextResponse.json({ error: "Opis je predugačak (>100 znakova)." });
  }

  const review = await prismadb.review.create({
    data: {
      description,
      ratingNumber,
      userId: currentUser.id,
      userImg: userImg,
      userName: userName,
      jobId: jobId,
    },
  });

  return NextResponse.json(review);
}
