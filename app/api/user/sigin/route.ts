import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { user } from "@prisma/client";
import { schemaUserSinIn } from "@/app/_utils/validated/articles/schemaArticle";
import prisma from "@/app/_utils/prisma/db";
import { handelToken } from "@/app/_utils/handelToken";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as user;

  const validated = schemaUserSinIn.safeParse(body);

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
    select: {
      email: true,
      password: true,
      username: true,
      id: true,
      isAdmin: true,
    },
  });

  if (userTest) {
    const password = bcrypt.compareSync(body.password, userTest.password);
    if (password) {
      const user = {
        email: userTest.email,
        username: userTest.username,
        id: userTest.id,
        isAdmin: userTest.isAdmin,
      };

      const cookie = handelToken(user);

      return NextResponse.json(
        { user },
        { status: 200, headers: { "set-cookie": cookie } }
      );
    }
    return NextResponse.json(
      { error: "this password is not true" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { error: "this email is not true" },
    { status: 401 }
  );
}
