import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Projects & Tasks",
  description: "Track projects with progress, task tables, priorities, and team assignments.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      tasks: { include: { assignee: true }, orderBy: { createdAt: "asc" } },
      members: { include: { employee: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const statusOrder = ["active", "planning", "on-hold", "completed"];
  const sortedProjects = [...projects].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  const allTasks = projects.flatMap((p) => p.tasks);
  const taskStats = {
    todo: allTasks.filter((t) => t.status === "todo").length,
    inProgress: allTasks.filter((t) => t.status === "in-progress").length,
    review: allTasks.filter((t) => t.status === "review").length,
    done: allTasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Projects & Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {projects.length} projects &middot; {allTasks.length} total tasks
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">To Do</p>
          <p className="mt-1 text-2xl font-bold text-slate-700">{taskStats.todo}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">In Progress</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">In Review</p>
          <p className="mt-1 text-2xl font-bold text-purple-600">{taskStats.review}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Completed</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{taskStats.done}</p>
        </div>
      </div>

      <div className="space-y-6">
        {sortedProjects.map((project) => (
          <section
            key={project.id}
            className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            aria-label={project.name}
          >
            <div className="border-b border-border p-6">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-card-foreground">{project.name}</h2>
                <StatusBadge status={project.status} />
                <PriorityBadge priority={project.priority} />
                <span className="ml-auto text-sm text-muted-foreground">Due {project.deadline.toISOString().split("T")[0]}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.progress === 100 ? "bg-green-500" : project.progress >= 50 ? "bg-primary" : "bg-amber-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {project.members.map((m) => (
                    <div
                      key={m.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary"
                      title={m.employee.name}
                    >
                      {m.employee.avatar}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground" scope="col">Task</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground" scope="col">Assignee</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground" scope="col">Status</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground" scope="col">Priority</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground" scope="col">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {project.tasks.map((task) => (
                    <tr key={task.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-6 py-3 font-medium text-card-foreground">{task.title}</td>
                      <td className="px-6 py-3 text-muted-foreground">{task.assignee.name}</td>
                      <td className="px-6 py-3"><TaskStatusBadge status={task.status} /></td>
                      <td className="px-6 py-3"><PriorityBadge priority={task.priority} /></td>
                      <td className="px-6 py-3 text-muted-foreground">{task.dueDate.toISOString().split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    "on-hold": "bg-amber-100 text-amber-700",
    planning: "bg-purple-100 text-purple-700",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || "bg-slate-100 text-slate-600"}`}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-green-100 text-green-700",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[priority] || "bg-slate-100 text-slate-600"}`}>{priority}</span>;
}

function TaskStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    todo: "bg-slate-100 text-slate-600",
    "in-progress": "bg-blue-100 text-blue-700",
    review: "bg-purple-100 text-purple-700",
    done: "bg-green-100 text-green-700",
  };
  const labels: Record<string, string> = { todo: "To Do", "in-progress": "In Progress", review: "Review", done: "Done" };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || "bg-slate-100 text-slate-600"}`}>{labels[status] || status}</span>;
}
