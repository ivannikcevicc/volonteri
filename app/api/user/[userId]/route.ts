import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
interface Props {
  name: string;
  imageSrc: string;
  userId: string;
}

export async function PATCH(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { name, imageSrc, userId } = params;

  if (currentUser.id !== userId) return NextResponse.error();

  const user = await prismadb.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      image: imageSrc,
    },
  });

  return NextResponse.json(user);
}
