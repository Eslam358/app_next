import { testUserToken } from "@/app/_utils/handelToken";
import { schemaArticle } from "@/app/_utils/validated/articles/schemaArticle";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/_utils/prisma/db";
import { Article } from "@prisma/client";



export async function GET(request: NextRequest) {
  try {
    const userId = testUserToken(request);
    console.log("-----------------------",userId)
    console.log("-----------------------",userId.isAdmin)

    if (!userId) {
      return NextResponse.json(
        { error: "token not found you can't get articles , please login" },
        { status: 404 }
      );
    }

    if (userId.isAdmin === true) {
      const Articles = await prisma.article.findMany();
      return NextResponse.json(Articles, { status: 200 });
    }

    const Articles = await prisma.article.findMany({
      where: {
        userId: userId.id,
      },
    });
    return NextResponse.json({All_Articles:Articles}, { status: 200 });
  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Article;

    const validated = schemaArticle.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }
    const testUser = testUserToken(request);
    if (!testUser) {
      return NextResponse.json(
        { error: "token not found you can't create article" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: testUser.id,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User not found please login or register" },
        { status: 404 }
      );
    }

    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        userId: user.id,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
