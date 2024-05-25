import bcrypt from "bcrypt";
import prismadb from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (name.length > 30) {
    return NextResponse.json({
      error: "Imeje predugačko (>30 znakova).",
    });
  }

  const user = await prismadb.user.create({
    data: { email, name, hashedPassword },
  });

  return NextResponse.json(user);
}
