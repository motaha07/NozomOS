import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Company wiki with categorized articles, tags, and authorship tracking.",
};

export default async function WikiPage() {
  const articles = await prisma.wikiArticle.findMany({
    include: { author: { select: { name: true, avatar: true } } },
    orderBy: { updatedAt: "desc" },
  });

  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Knowledge Base</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Company wiki with {articles.length} articles across {categories.length} categories
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="list" aria-label="Categories">
        <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white" role="listitem">All</span>
        {categories.map((cat) => (
          <span key={cat} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground" role="listitem">{cat}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {articles.map((article) => {
          const tags: string[] = JSON.parse(article.tags);
          return (
            <article key={article.id} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{article.category}</span>
                <span className="text-xs text-muted-foreground">Updated {article.updatedAt.toISOString().split("T")[0]}</span>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-card-foreground">{article.title}</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{article.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {article.author.avatar || article.author.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs text-muted-foreground">{article.author.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{tag}</span>
                  ))}
                  {tags.length > 3 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">+{tags.length - 3}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
