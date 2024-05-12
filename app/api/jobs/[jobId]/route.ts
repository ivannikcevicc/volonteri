import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
interface Props {
  jobId?: string;
}

export async function DELETE(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { jobId } = params;

  if (!jobId || typeof jobId !== "string") {
    throw new Error("Invalid ID");
  }

  const job = await prismadb.job.deleteMany({
    where: {
      id: jobId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(job);
}
