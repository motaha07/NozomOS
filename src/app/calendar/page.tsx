import { calendarEvents } from "@/lib/data";

export default function CalendarPage() {
  // Group events by date
  const eventsByDate = calendarEvents.reduce<Record<string, typeof calendarEvents>>((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(eventsByDate).sort();

  const typeColors: Record<string, { dot: string; bg: string; text: string }> = {
    meeting: { dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
    deadline: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
    event: { dot: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
    holiday: { dot: "bg-green-500", bg: "bg-green-50", text: "text-green-700" },
  };

  const typeCounts = {
    meeting: calendarEvents.filter((e) => e.type === "meeting").length,
    deadline: calendarEvents.filter((e) => e.type === "deadline").length,
    event: calendarEvents.filter((e) => e.type === "event").length,
    holiday: calendarEvents.filter((e) => e.type === "holiday").length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Calendar & Events</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upcoming meetings, deadlines, events, and holidays
        </p>
      </div>

      {/* Type legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        {Object.entries(typeCounts).map(([type, count]) => {
          const color = typeColors[type];
          return (
            <div
              key={type}
              className={`flex items-center gap-2 rounded-lg ${color.bg} px-4 py-2 text-sm font-medium ${color.text}`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${color.dot}`} />
              {type.charAt(0).toUpperCase() + type.slice(1)}s ({count})
            </div>
          );
        })}
      </div>

      {/* Events timeline */}
      <div className="space-y-8">
        {sortedDates.map((date) => {
          const events = eventsByDate[date];
          const dateObj = new Date(date + "T00:00:00");
          const isToday = date === "2026-02-07";

          return (
            <div key={date}>
              {/* Date header */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl border ${
                    isToday
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card text-card-foreground"
                  }`}
                >
                  <span className="text-[10px] font-semibold uppercase leading-none">
                    {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-lg font-bold leading-tight">
                    {dateObj.getDate()}
                  </span>
                </div>
                <div>
                  <p className={`font-semibold ${isToday ? "text-primary" : "text-foreground"}`}>
                    {dateObj.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {isToday && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Today
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {events.length} event{events.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Events for this date */}
              <div className="ml-7 space-y-3 border-l-2 border-border pl-10">
                {events
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => {
                    const color = typeColors[event.type];
                    return (
                      <div
                        key={event.id}
                        className="relative rounded-xl border border-border bg-card p-5 shadow-sm"
                      >
                        {/* Connector dot */}
                        <div
                          className={`absolute -left-[2.85rem] top-6 h-3 w-3 rounded-full border-2 border-white ${color.dot}`}
                        />
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text}`}>
                                {event.type}
                              </span>
                            </div>
                            <h3 className="text-base font-semibold text-card-foreground">
                              {event.title}
                            </h3>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-card-foreground">
                              {event.time === "00:00" ? "All day" : event.time}
                            </p>
                            <p className="text-xs text-muted-foreground">{event.duration}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            {event.attendees.join(", ")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
