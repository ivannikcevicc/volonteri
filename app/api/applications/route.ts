import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { jobId, fileUrl, name, email, phoneNumber, expirience, about } = body;

  if (!jobId || !name || !email || !phoneNumber || !expirience) {
    return NextResponse.json({ error: "Fale podaci." });
  }

  const existingApplication = await prismadb.application.findFirst({
    where: {
      jobId: jobId,
      userId: currentUser.id,
    },
  });

  if (existingApplication) {
    return NextResponse.json({ error: "Veza je već prijavljena." });
  }

  if (about.length > 300) {
    return NextResponse.json({ error: "Opis je predugačak (>300 znakova)." });
  }

  const jobAndApplication = await prismadb.job.update({
    where: {
      id: jobId,
    },
    data: {
      applications: {
        create: {
          userId: currentUser.id,
          fileUrl: fileUrl,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          expirience: expirience,
          about: about,
        },
      },
    },
  });

  return NextResponse.json(jobAndApplication);
}
