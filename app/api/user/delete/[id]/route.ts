import { NextResponse, NextRequest } from "next/server";
import { user } from "@prisma/client";
import { testUserToken } from "@/app/_utils/handelToken";
import prisma from "@/app/_utils/prisma/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// type Params = { id: string };
type Params = Promise<{ id: string }>;
export async function DELETE(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;

  const id = parseInt(params.id);

  try {
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "id must be a number" },
        { status: 400 }
      );
    }

    //------------------------
    const testUser = await prisma.user.findUnique({ where: { id: id } });
    if (!testUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    //------------------------

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
    //------------------------
    const User = await prisma.user.delete({
      where: { id: id },
      select: { id: true, email: true, username: true, isAdmin: true },
    });
    if (!User) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    (await cookies()).delete("token");
    return NextResponse.json(
      { massage: " deleted successfully", User },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
