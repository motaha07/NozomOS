import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { wikiArticleSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const articles = await prisma.wikiArticle.findMany({
      where: category ? { category } : undefined,
      include: { author: { select: { name: true, avatar: true } } },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(
      articles.map((a) => ({
        ...a,
        tags: JSON.parse(a.tags),
      }))
    );
  } catch (error) {
    console.error("Failed to fetch wiki articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch wiki articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = wikiArticleSchema.parse(body);

    const article = await prisma.wikiArticle.create({
      data: {
        title: validated.title,
        category: validated.category,
        content: validated.content,
        tags: JSON.stringify(validated.tags),
        authorId: session.user!.id!,
      },
      include: { author: { select: { name: true, avatar: true } } },
    });

    return NextResponse.json(
      { ...article, tags: JSON.parse(article.tags) },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Failed to create wiki article:", error);
    return NextResponse.json(
      { error: "Failed to create wiki article" },
      { status: 500 }
    );
  }
}
