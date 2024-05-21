import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
interface Props {
  name: string;
  imageSrc: string;
  userId: string;
}

export async function PATCH(request: Request, { params }: { params: Props }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const body = await request.json();
    const { name, imageSrc, userId } = body;

    if (currentUser.id !== userId) return NextResponse.error();

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image: imageSrc,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  return NextResponse.json(user);
}
