import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "brad@sandboxd36069e467e04cdaaa57a360478f6821.mailgun.org",
    key:
      process.env.MAILGUN_API_KEY ||
      "c09a59d038bfaaab5173df5cd6dc384b-a2dd40a3-52dcc411",
  });

  const body = await request.json();

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.error();
  }

  mg.messages
    .create("sandboxd36069e467e04cdaaa57a360478f6821.mailgun.org", {
      from: `Excited User <${email}>`,
      to: ["nikcevici13@gmail.com"],
      subject: `Email Volonteri, ${name}!`,
      text: `${message}`,
    })
    .then((msg: any) => NextResponse.json("msg: ", msg)) // logs response data
    .catch((err: any) => NextResponse.json("err: ", err)); // logs any error

  if (!currentUser) {
    return NextResponse.error();
  }

  return NextResponse.json("aa");
}
