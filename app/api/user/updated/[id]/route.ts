import { NextResponse, NextRequest } from "next/server";
import { user } from "@prisma/client";
import prisma from "@/app/_utils/prisma/db";
import { handelToken, testUserToken } from "@/app/_utils/handelToken";
import { schemaUserUpdate } from "@/app/_utils/validated/articles/schemaArticle";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id_ = (await params).id;
    const id = parseInt(id_);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "id must be a number" },
        { status: 400 }
      );
    }

    const testUser = await prisma.user.findUnique({ where: { id: id } });

    if (!testUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const testToken = testUserToken(request);

    if (!testToken) {
      return NextResponse.json({ error: "token not found" }, { status: 404 });
    }
    if (testToken.id !== id) {
      return NextResponse.json(
        { error: " you can't update this user" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as user;
    const validated = schemaUserUpdate.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const User: {
      email: string;
      username: string;
      id: number;
      isAdmin: boolean;
    } = await prisma.user.update({
      where: { id: id },
      data: body,
      select: { email: true, username: true, id: true, isAdmin: true },
    });

    if (!User) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const cookie = handelToken(User);

    return NextResponse.json(
      { massage: " updated successfully", User, cookie },
      { status: 200, headers: { "set-cookie": cookie } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, message: "Eslam tell you response is error" },
      { status: 500 }
    );
  }
}
