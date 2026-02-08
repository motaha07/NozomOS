import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Company updates, news, and announcements.",
};

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    include: { author: { select: { name: true, avatar: true } } },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  const pinnedAnnouncements = announcements.filter((a) => a.pinned);
  const regularAnnouncements = announcements.filter((a) => !a.pinned);

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
        <p className="mt-1 text-sm text-muted-foreground">Company updates, news, and announcements</p>
      </div>

      {pinnedAnnouncements.length > 0 && (
        <section className="mb-8" aria-label="Pinned announcements">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
            </svg>
            Pinned
          </h2>
          <div className="space-y-4">
            {pinnedAnnouncements.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        </section>
      )}

      <section aria-label="Recent announcements">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent</h2>
        <div className="space-y-4">
          {regularAnnouncements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AnnouncementCard({
  announcement,
}: {
  announcement: {
    id: string;
    title: string;
    content: string;
    type: string;
    pinned: boolean;
    createdAt: Date;
    author: { name: string; avatar: string | null };
  };
}) {
  const typeStyles: Record<string, { border: string; bg: string; badge: string }> = {
    general: { border: "border-slate-200", bg: "bg-card", badge: "bg-slate-100 text-slate-600" },
    urgent: { border: "border-red-200", bg: "bg-red-50/50", badge: "bg-red-100 text-red-700" },
    celebration: { border: "border-green-200", bg: "bg-green-50/50", badge: "bg-green-100 text-green-700" },
    update: { border: "border-blue-200", bg: "bg-blue-50/50", badge: "bg-blue-100 text-blue-700" },
  };
  const style = typeStyles[announcement.type] || typeStyles.general;

  return (
    <article className={`rounded-xl border ${style.border} ${style.bg} p-6 shadow-sm`}>
      <div className="mb-3 flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}>{announcement.type}</span>
        {announcement.pinned && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Pinned</span>
        )}
        <span className="text-xs text-muted-foreground">{announcement.createdAt.toISOString().split("T")[0]}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">{announcement.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{announcement.content}</p>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
          {announcement.author.avatar || announcement.author.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="text-sm font-medium text-card-foreground">{announcement.author.name}</span>
      </div>
    </article>
  );
}
