
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { user } from "@prisma/client";
import { schemaUserRegister } from "@/app/_utils/validated/articles/schemaArticle";
import prisma from "@/app/_utils/prisma/db";
import { handelToken } from "@/app/_utils/handelToken";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as user;



  const validated = schemaUserRegister.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.issues[0].message },
      { status: 400 }
    );
  }


  const userTest = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userTest) {
    return NextResponse.json({ error: "User already exists, use login" }, { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      username: body.username,
      password: hashedPassword,
    },
    select: {
      email: true,
      username: true,
      id: true,
      isAdmin: true,
    },
  });
  
  const cookie = handelToken(newUser)

  return NextResponse.json({ newUser }, { status: 201, headers: { "Set-Cookie": cookie } });
}
