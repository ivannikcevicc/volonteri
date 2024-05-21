import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

interface Props {
  applicationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { applicationId } = params;
  if (!applicationId || typeof applicationId !== "string") {
    throw new Error("Invalid ID");
  }

  const application = await prismadb.application.deleteMany({
    where: {
      id: applicationId,
      OR: [{ userId: currentUser.id }, { job: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(application);
}

export async function GET(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { applicationId } = params;
  if (!applicationId || typeof applicationId !== "string") {
    throw new Error("Invalid ID");
  }

  const application = await prismadb.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  return NextResponse.json(application);
}
