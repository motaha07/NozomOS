import { announcements } from "@/lib/data";

export default function AnnouncementsPage() {
  const pinnedAnnouncements = announcements.filter((a) => a.pinned);
  const regularAnnouncements = announcements.filter((a) => !a.pinned);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Company updates, news, and announcements
        </p>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
            </svg>
            Pinned
          </h2>
          <div className="space-y-4">
            {pinnedAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent
        </h2>
        <div className="space-y-4">
          {regularAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
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
    author: string;
    date: string;
    type: string;
    pinned: boolean;
  };
}) {
  const typeStyles: Record<string, { border: string; bg: string; badge: string }> = {
    general: {
      border: "border-slate-200",
      bg: "bg-card",
      badge: "bg-slate-100 text-slate-600",
    },
    urgent: {
      border: "border-red-200",
      bg: "bg-red-50/50",
      badge: "bg-red-100 text-red-700",
    },
    celebration: {
      border: "border-green-200",
      bg: "bg-green-50/50",
      badge: "bg-green-100 text-green-700",
    },
    update: {
      border: "border-blue-200",
      bg: "bg-blue-50/50",
      badge: "bg-blue-100 text-blue-700",
    },
  };
  const style = typeStyles[announcement.type] || typeStyles.general;

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} p-6 shadow-sm`}>
      <div className="mb-3 flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}>
          {announcement.type}
        </span>
        {announcement.pinned && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Pinned
          </span>
        )}
        <span className="text-xs text-muted-foreground">{announcement.date}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">{announcement.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{announcement.content}</p>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
          {announcement.author.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="text-sm font-medium text-card-foreground">{announcement.author}</span>
      </div>
    </div>
  );
}
