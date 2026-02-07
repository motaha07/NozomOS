import { metrics, projects, announcements, calendarEvents, employees } from "@/lib/data";

export default function DashboardPage() {
  const todayEvents = calendarEvents.filter((e) => e.date === "2026-02-07");
  const recentAnnouncements = announcements.slice(0, 3);
  const activeProjects = projects.filter((p) => p.status === "active");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, Sarah. Here&apos;s what&apos;s happening at Nozom today.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Team Members" value={metrics.totalEmployees} icon="team" color="blue" />
        <MetricCard title="Active Projects" value={metrics.activeProjects} icon="projects" color="purple" />
        <MetricCard title="Open Tasks" value={metrics.openTasks} icon="tasks" color="amber" />
        <MetricCard title="Upcoming Events" value={metrics.upcomingEvents} icon="events" color="green" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Active Projects</h2>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-card-foreground">{project.name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : project.priority === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {project.priority}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.progress}% complete</span>
                    <span>Due {project.deadline}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    {project.team.slice(0, 4).map((member) => {
                      const initials = member.split(" ").map((n) => n[0]).join("");
                      return (
                        <div
                          key={member}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary"
                          title={member}
                        >
                          {initials}
                        </div>
                      );
                    })}
                    {project.team.length > 4 && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-500">
                        +{project.team.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Today&apos;s Schedule</h2>
            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div key={event.id} className="flex gap-3 rounded-lg border border-border p-3">
                    <div
                      className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                        event.type === "meeting"
                          ? "bg-blue-500"
                          : event.type === "deadline"
                          ? "bg-red-500"
                          : event.type === "event"
                          ? "bg-purple-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.time} &middot; {event.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No events scheduled for today.</p>
            )}
          </div>

          {/* Recent Announcements */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Latest Announcements</h2>
            <div className="space-y-3">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="mb-1 flex items-center gap-2">
                    {announcement.pinned && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        Pinned
                      </span>
                    )}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        announcement.type === "urgent"
                          ? "bg-red-100 text-red-700"
                          : announcement.type === "celebration"
                          ? "bg-green-100 text-green-700"
                          : announcement.type === "update"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {announcement.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-card-foreground">{announcement.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {announcement.author} &middot; {announcement.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Team Status */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Team Status</h2>
            <div className="space-y-2">
              {employees.slice(0, 6).map((emp) => (
                <div key={emp.id} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {emp.avatar}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                        emp.status === "active"
                          ? "bg-green-500"
                          : emp.status === "away"
                          ? "bg-amber-500"
                          : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-card-foreground">{emp.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  const colorClasses: Record<string, { bg: string; text: string; iconBg: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", iconBg: "bg-blue-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", iconBg: "bg-purple-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", iconBg: "bg-amber-100" },
    green: { bg: "bg-green-50", text: "text-green-600", iconBg: "bg-green-100" },
  };
  const c = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`rounded-xl border border-border ${c.bg} p-5 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`mt-1 text-3xl font-bold ${c.text}`}>{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.iconBg}`}>
          {icon === "team" && (
            <svg className={`h-6 w-6 ${c.text}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          )}
          {icon === "projects" && (
            <svg className={`h-6 w-6 ${c.text}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          )}
          {icon === "tasks" && (
            <svg className={`h-6 w-6 ${c.text}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          )}
          {icon === "events" && (
            <svg className={`h-6 w-6 ${c.text}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
