import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.projectMember.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.wikiArticle.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create users with hashed passwords
  const password = hashSync("password123", 10);

  const usersData = [
    { name: "Sarah Chen", email: "sarah@nozom.com", role: "admin", avatar: "SC" },
    { name: "Marcus Johnson", email: "marcus@nozom.com", role: "admin", avatar: "MJ" },
    { name: "Aisha Patel", email: "aisha@nozom.com", role: "member", avatar: "AP" },
    { name: "David Kim", email: "david@nozom.com", role: "member", avatar: "DK" },
    { name: "Emma Wilson", email: "emma@nozom.com", role: "member", avatar: "EW" },
    { name: "James Rodriguez", email: "james@nozom.com", role: "member", avatar: "JR" },
    { name: "Fatima Al-Hassan", email: "fatima@nozom.com", role: "member", avatar: "FA" },
    { name: "Tom Bradley", email: "tom@nozom.com", role: "member", avatar: "TB" },
    { name: "Lisa Chang", email: "lisa@nozom.com", role: "member", avatar: "LC" },
    { name: "Omar Hassan", email: "omar@nozom.com", role: "member", avatar: "OH" },
    { name: "Rachel Green", email: "rachel@nozom.com", role: "member", avatar: "RG" },
    { name: "Yuki Tanaka", email: "yuki@nozom.com", role: "member", avatar: "YT" },
  ];

  const users: Record<string, string> = {};
  for (const u of usersData) {
    const user = await prisma.user.create({
      data: { name: u.name, email: u.email, hashedPassword: password, role: u.role, avatar: u.avatar },
    });
    users[u.name] = user.id;
  }

  // Create employees
  const employeesData = [
    { name: "Sarah Chen", role: "CEO & Co-Founder", department: "Executive", email: "sarah@nozom.com", avatar: "SC", status: "active", joinDate: "2022-01-15", phone: "+1 (555) 100-0001", location: "San Francisco, CA" },
    { name: "Marcus Johnson", role: "CTO", department: "Engineering", email: "marcus@nozom.com", avatar: "MJ", status: "active", joinDate: "2022-01-15", phone: "+1 (555) 100-0002", location: "San Francisco, CA" },
    { name: "Aisha Patel", role: "VP of Design", department: "Design", email: "aisha@nozom.com", avatar: "AP", status: "active", joinDate: "2022-03-01", phone: "+1 (555) 100-0003", location: "New York, NY" },
    { name: "David Kim", role: "Senior Engineer", department: "Engineering", email: "david@nozom.com", avatar: "DK", status: "away", joinDate: "2022-06-10", phone: "+1 (555) 100-0004", location: "Seattle, WA" },
    { name: "Emma Wilson", role: "Product Manager", department: "Product", email: "emma@nozom.com", avatar: "EW", status: "active", joinDate: "2022-09-01", phone: "+1 (555) 100-0005", location: "San Francisco, CA" },
    { name: "James Rodriguez", role: "Frontend Engineer", department: "Engineering", email: "james@nozom.com", avatar: "JR", status: "active", joinDate: "2023-01-15", phone: "+1 (555) 100-0006", location: "Austin, TX" },
    { name: "Fatima Al-Hassan", role: "UX Researcher", department: "Design", email: "fatima@nozom.com", avatar: "FA", status: "offline", joinDate: "2023-03-20", phone: "+1 (555) 100-0007", location: "Chicago, IL" },
    { name: "Tom Bradley", role: "DevOps Engineer", department: "Engineering", email: "tom@nozom.com", avatar: "TB", status: "active", joinDate: "2023-05-10", phone: "+1 (555) 100-0008", location: "Denver, CO" },
    { name: "Lisa Chang", role: "Marketing Lead", department: "Marketing", email: "lisa@nozom.com", avatar: "LC", status: "active", joinDate: "2023-07-01", phone: "+1 (555) 100-0009", location: "Los Angeles, CA" },
    { name: "Omar Hassan", role: "Backend Engineer", department: "Engineering", email: "omar@nozom.com", avatar: "OH", status: "active", joinDate: "2023-09-15", phone: "+1 (555) 100-0010", location: "Remote" },
    { name: "Rachel Green", role: "HR Manager", department: "People", email: "rachel@nozom.com", avatar: "RG", status: "active", joinDate: "2022-04-01", phone: "+1 (555) 100-0011", location: "San Francisco, CA" },
    { name: "Yuki Tanaka", role: "Data Scientist", department: "Engineering", email: "yuki@nozom.com", avatar: "YT", status: "away", joinDate: "2023-11-01", phone: "+1 (555) 100-0012", location: "San Francisco, CA" },
  ];

  const employees: Record<string, string> = {};
  for (const e of employeesData) {
    const emp = await prisma.employee.create({
      data: {
        userId: users[e.name],
        name: e.name,
        role: e.role,
        department: e.department,
        email: e.email,
        avatar: e.avatar,
        status: e.status,
        joinDate: new Date(e.joinDate),
        phone: e.phone,
        location: e.location,
      },
    });
    employees[e.name] = emp.id;
  }

  // Create projects
  const projectsData = [
    {
      name: "NozomOS Platform v2.0",
      description: "Major platform redesign with new dashboard, improved performance, and mobile support.",
      status: "active", progress: 68, deadline: "2026-04-15", priority: "high",
      members: ["Marcus Johnson", "David Kim", "James Rodriguez", "Omar Hassan"],
      tasks: [
        { title: "Redesign dashboard layout", assignee: "James Rodriguez", status: "done", priority: "high", dueDate: "2026-02-01" },
        { title: "Implement new API endpoints", assignee: "Omar Hassan", status: "in-progress", priority: "high", dueDate: "2026-02-28" },
        { title: "Mobile responsive overhaul", assignee: "James Rodriguez", status: "in-progress", priority: "medium", dueDate: "2026-03-15" },
        { title: "Performance optimization", assignee: "David Kim", status: "todo", priority: "high", dueDate: "2026-03-30" },
        { title: "User testing & QA", assignee: "Emma Wilson", status: "todo", priority: "medium", dueDate: "2026-04-10" },
      ],
    },
    {
      name: "Brand Refresh Campaign",
      description: "Complete brand identity refresh including new logo, color palette, and marketing materials.",
      status: "active", progress: 45, deadline: "2026-03-30", priority: "medium",
      members: ["Aisha Patel", "Lisa Chang", "Fatima Al-Hassan"],
      tasks: [
        { title: "Logo design exploration", assignee: "Aisha Patel", status: "done", priority: "high", dueDate: "2026-01-20" },
        { title: "Color palette finalization", assignee: "Aisha Patel", status: "review", priority: "medium", dueDate: "2026-02-10" },
        { title: "Marketing collateral design", assignee: "Lisa Chang", status: "in-progress", priority: "medium", dueDate: "2026-03-01" },
        { title: "User research on brand perception", assignee: "Fatima Al-Hassan", status: "todo", priority: "low", dueDate: "2026-03-15" },
      ],
    },
    {
      name: "Infrastructure Migration",
      description: "Migrate all services to new cloud infrastructure with improved reliability and cost efficiency.",
      status: "active", progress: 30, deadline: "2026-05-01", priority: "high",
      members: ["Tom Bradley", "Marcus Johnson", "David Kim"],
      tasks: [
        { title: "Audit current infrastructure", assignee: "Tom Bradley", status: "done", priority: "high", dueDate: "2026-01-30" },
        { title: "Design new architecture", assignee: "Marcus Johnson", status: "in-progress", priority: "high", dueDate: "2026-02-28" },
        { title: "Set up staging environment", assignee: "Tom Bradley", status: "todo", priority: "medium", dueDate: "2026-03-15" },
        { title: "Data migration plan", assignee: "David Kim", status: "todo", priority: "high", dueDate: "2026-03-30" },
        { title: "Production cutover", assignee: "Tom Bradley", status: "todo", priority: "high", dueDate: "2026-04-20" },
      ],
    },
    {
      name: "Employee Onboarding Revamp",
      description: "Redesign the employee onboarding experience with automated workflows and better documentation.",
      status: "planning", progress: 10, deadline: "2026-06-01", priority: "medium",
      members: ["Rachel Green", "Emma Wilson"],
      tasks: [
        { title: "Map current onboarding process", assignee: "Rachel Green", status: "in-progress", priority: "medium", dueDate: "2026-02-15" },
        { title: "Design new workflow", assignee: "Emma Wilson", status: "todo", priority: "medium", dueDate: "2026-03-01" },
      ],
    },
    {
      name: "Analytics Dashboard",
      description: "Build a comprehensive analytics dashboard for tracking key business metrics.",
      status: "completed", progress: 100, deadline: "2026-01-15", priority: "medium",
      members: ["Yuki Tanaka", "James Rodriguez"],
      tasks: [
        { title: "Define key metrics", assignee: "Yuki Tanaka", status: "done", priority: "high", dueDate: "2025-11-15" },
        { title: "Build data pipeline", assignee: "Yuki Tanaka", status: "done", priority: "high", dueDate: "2025-12-15" },
        { title: "Frontend implementation", assignee: "James Rodriguez", status: "done", priority: "medium", dueDate: "2026-01-10" },
      ],
    },
  ];

  for (const p of projectsData) {
    const project = await prisma.project.create({
      data: {
        name: p.name,
        description: p.description,
        status: p.status,
        progress: p.progress,
        deadline: new Date(p.deadline),
        priority: p.priority,
      },
    });

    for (const memberName of p.members) {
      await prisma.projectMember.create({
        data: { projectId: project.id, employeeId: employees[memberName] },
      });
    }

    for (const t of p.tasks) {
      await prisma.task.create({
        data: {
          title: t.title,
          status: t.status,
          priority: t.priority,
          dueDate: new Date(t.dueDate),
          projectId: project.id,
          assigneeId: employees[t.assignee],
        },
      });
    }
  }

  // Create wiki articles
  const articlesData = [
    { title: "Getting Started at Nozom", category: "Onboarding", content: "Welcome to Nozom! This guide will walk you through your first week, including setting up your development environment, meeting your team, and understanding our company culture. Start by reviewing the company handbook and completing your onboarding checklist.", author: "Rachel Green", tags: ["onboarding", "new-hire", "getting-started"] },
    { title: "Engineering Best Practices", category: "Engineering", content: "Our engineering team follows industry best practices including code reviews, CI/CD pipelines, and comprehensive testing. All code must go through peer review before merging. We use trunk-based development with short-lived feature branches.", author: "Marcus Johnson", tags: ["engineering", "best-practices", "code-review"] },
    { title: "Design System Guidelines", category: "Design", content: "Our design system ensures consistency across all products. It includes typography scales, color palettes, spacing systems, and component libraries. All new features should use components from our shared design library before creating custom ones.", author: "Aisha Patel", tags: ["design", "ui", "components", "style-guide"] },
    { title: "Remote Work Policy", category: "Policies", content: "Nozom supports a hybrid work model. Team members can work remotely up to 3 days per week. Core collaboration hours are 10am-3pm PT. All remote workers should ensure they have a reliable internet connection and a quiet workspace.", author: "Rachel Green", tags: ["remote", "policy", "hybrid", "work-from-home"] },
    { title: "Product Development Lifecycle", category: "Product", content: "Our product development follows a structured lifecycle: Discovery, Definition, Design, Development, Testing, Launch, and Iteration. Each phase has specific deliverables and review gates. Product managers own the roadmap and prioritization.", author: "Emma Wilson", tags: ["product", "lifecycle", "process", "development"] },
    { title: "Security & Compliance", category: "Engineering", content: "All team members must follow our security guidelines. This includes using 2FA, encrypting sensitive data, following the principle of least privilege, and reporting any security incidents immediately. Annual security training is mandatory.", author: "Tom Bradley", tags: ["security", "compliance", "privacy", "infosec"] },
    { title: "Benefits & Perks Guide", category: "People", content: "Nozom offers comprehensive benefits including health insurance, 401(k) matching, unlimited PTO, learning stipends, home office budget, and wellness programs. Review the full benefits package in your onboarding materials.", author: "Rachel Green", tags: ["benefits", "perks", "compensation", "hr"] },
    { title: "Data Analytics Playbook", category: "Engineering", content: "Our data analytics stack includes a modern data warehouse, ETL pipelines, and visualization tools. This playbook covers how to request data, build dashboards, and interpret key metrics. All data requests should go through the analytics team.", author: "Yuki Tanaka", tags: ["data", "analytics", "metrics", "dashboards"] },
  ];

  for (const a of articlesData) {
    await prisma.wikiArticle.create({
      data: {
        title: a.title,
        category: a.category,
        content: a.content,
        authorId: users[a.author],
        tags: JSON.stringify(a.tags),
      },
    });
  }

  // Create announcements
  const announcementsData = [
    { title: "Q1 2026 All-Hands Meeting", content: "Join us for our Q1 All-Hands meeting this Friday at 2pm PT. We'll be reviewing our Q4 results, sharing the roadmap for 2026, and celebrating team achievements. The meeting will be held in the main conference room and streamed live for remote team members.", author: "Sarah Chen", type: "general", pinned: true },
    { title: "Welcome New Team Members!", content: "Please join us in welcoming our newest team members who joined in January: Alex Rivera (Engineering), Priya Sharma (Design), and Carlos Mendez (Marketing). Say hello when you see them!", author: "Rachel Green", type: "celebration", pinned: false },
    { title: "System Maintenance - Feb 15", content: "Scheduled maintenance window on February 15th from 11pm-3am PT. Internal tools including email, Slack, and the wiki may experience brief interruptions. Please save your work before the maintenance window.", author: "Tom Bradley", type: "urgent", pinned: true },
    { title: "New Design System v3.0 Released", content: "The Design team is excited to announce the release of Design System v3.0! This update includes new components, improved accessibility, dark mode support, and updated documentation. Check the wiki for migration guides.", author: "Aisha Patel", type: "update", pinned: false },
    { title: "Annual Team Retreat - Save the Date", content: "Mark your calendars! Our annual team retreat is scheduled for April 10-12 in Lake Tahoe. More details on activities, accommodation, and travel arrangements will be shared soon.", author: "Sarah Chen", type: "celebration", pinned: false },
    { title: "Updated PTO Policy", content: "We've updated our PTO policy to include additional mental health days. Each team member now has 3 dedicated mental health days per quarter in addition to unlimited PTO. Please review the updated policy on the wiki.", author: "Rachel Green", type: "update", pinned: false },
  ];

  for (const a of announcementsData) {
    await prisma.announcement.create({
      data: {
        title: a.title,
        content: a.content,
        authorId: users[a.author],
        type: a.type,
        pinned: a.pinned,
      },
    });
  }

  // Create calendar events
  const eventsData = [
    { title: "Q1 All-Hands Meeting", date: "2026-02-07", time: "14:00", duration: "1.5h", type: "meeting", attendees: ["All Company"], location: "Main Conference Room / Zoom" },
    { title: "Engineering Sprint Planning", date: "2026-02-10", time: "10:00", duration: "1h", type: "meeting", attendees: ["Engineering Team"], location: "Eng Room A" },
    { title: "Design Review - Brand Refresh", date: "2026-02-11", time: "11:00", duration: "45m", type: "meeting", attendees: ["Aisha Patel", "Lisa Chang", "Sarah Chen"], location: "Design Studio" },
    { title: "Platform v2.0 Milestone", date: "2026-02-14", time: "23:59", duration: "-", type: "deadline", attendees: ["Engineering Team"], location: "-" },
    { title: "System Maintenance Window", date: "2026-02-15", time: "23:00", duration: "4h", type: "event", attendees: ["Tom Bradley"], location: "Remote" },
    { title: "Presidents' Day", date: "2026-02-16", time: "00:00", duration: "All day", type: "holiday", attendees: ["All Company"], location: "-" },
    { title: "1:1 Sarah & Marcus", date: "2026-02-10", time: "09:00", duration: "30m", type: "meeting", attendees: ["Sarah Chen", "Marcus Johnson"], location: "CEO Office" },
    { title: "Product Roadmap Review", date: "2026-02-12", time: "14:00", duration: "1h", type: "meeting", attendees: ["Emma Wilson", "Sarah Chen", "Marcus Johnson", "Aisha Patel"], location: "Board Room" },
    { title: "Lunch & Learn: AI in Production", date: "2026-02-13", time: "12:00", duration: "1h", type: "event", attendees: ["Open to All"], location: "Kitchen / Zoom" },
    { title: "Brand Refresh Deadline", date: "2026-03-30", time: "23:59", duration: "-", type: "deadline", attendees: ["Design Team", "Marketing"], location: "-" },
    { title: "Team Retreat", date: "2026-04-10", time: "09:00", duration: "3 days", type: "event", attendees: ["All Company"], location: "Lake Tahoe" },
    { title: "Weekly Standup", date: "2026-02-10", time: "09:30", duration: "15m", type: "meeting", attendees: ["All Company"], location: "Main Room / Zoom" },
  ];

  for (const e of eventsData) {
    await prisma.calendarEvent.create({
      data: {
        title: e.title,
        date: new Date(e.date),
        time: e.time,
        duration: e.duration,
        type: e.type,
        attendees: JSON.stringify(e.attendees),
        location: e.location,
      },
    });
  }

  // Create default settings
  const settingsData = [
    { key: "company_name", value: "Nozom" },
    { key: "company_domain", value: "nozom.com" },
    { key: "company_industry", value: "Technology" },
    { key: "timezone", value: "America/Los_Angeles" },
    { key: "workspace_url", value: "nozom.nozomos.app" },
    { key: "default_language", value: "en-US" },
    { key: "require_2fa", value: "true" },
    { key: "public_wiki", value: "false" },
    { key: "theme", value: "light" },
    { key: "accent_color", value: "blue" },
  ];

  for (const s of settingsData) {
    await prisma.setting.create({ data: s });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
