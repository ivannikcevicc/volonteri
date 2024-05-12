import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

interface Props {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prismadb.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { Job: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
