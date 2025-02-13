import { NextResponse, NextRequest } from "next/server";

import { Comment } from "@prisma/client";

import prisma from "@/app/_utils/prisma/db";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const articleId = request.nextUrl.searchParams.get("articleId");
  console.log(articleId , userId)

  try {
  if (userId) {
    if (articleId) {
      return commentsArticleIdAndUserId(articleId, userId);
    }
    return commentsUserId(userId);
  } else if (articleId) {
    return commentsArticleId(articleId);
  }

    const comment = await prisma.comment.findMany();
    return NextResponse.json(comment, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Comment;

  const newComment = await prisma.comment.create({
    data: {
      text: body.text,
      articleId: body.articleId,
      userId: body.userId,
    },
  });

  return NextResponse.json(newComment, { status: 201 });
}

const commentsUserId = async (userId: string) => {
  const id = parseInt(userId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: id,
      },
    });
    if (!comments) {
      return NextResponse.json(
        { error: "Articles not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
const commentsArticleId = async (articleId: string) => {
  const id = parseInt(articleId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: id,
      },
    });
    if (!comments) {
      return NextResponse.json(
        { error: "Articles not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
const commentsArticleIdAndUserId = async (
  articleId: string,
  userId: string
) => {
  const article_Id = parseInt(articleId);
  const user_Id = parseInt(userId);
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId: article_Id,
        userId: user_Id,
      },
    });
    if (!comments) {
      return NextResponse.json(
        { error: "Articles not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
