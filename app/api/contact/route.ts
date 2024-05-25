import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Resend } from "resend";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.error();
  }

  if (!currentUser) {
    return NextResponse.error();
  }

  if (message > 1000 || name.length > 30) {
    return NextResponse.json({
      error: "Opis ili ime predugačko (>1000 opis, >30 ime).",
    });
  }

  const resend = new Resend(`${process.env.RESEND_API_KEY}`);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["nikcevici13@gmail.com"],
    subject: `Message from ${name} - Volonteri`,
    html: `<p>From: ${name}</p><p>Email: ${email}</p><br/><p>Message: ${message}</p>`,
  });

  return NextResponse.json("aa");
}
