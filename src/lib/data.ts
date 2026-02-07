// Sample data for NozomOS Company Operating System

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  status: "active" | "away" | "offline";
  joinDate: string;
  phone: string;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  team: string[];
  deadline: string;
  priority: "high" | "medium" | "low";
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "high" | "medium" | "low";
  dueDate: string;
}

export interface WikiArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  lastUpdated: string;
  tags: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: "general" | "urgent" | "celebration" | "update";
  pinned: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "meeting" | "deadline" | "event" | "holiday";
  attendees: string[];
  location: string;
}

// --- Sample Data ---

export const employees: Employee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    department: "Executive",
    email: "sarah@nozom.com",
    avatar: "SC",
    status: "active",
    joinDate: "2022-01-15",
    phone: "+1 (555) 100-0001",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "CTO",
    department: "Engineering",
    email: "marcus@nozom.com",
    avatar: "MJ",
    status: "active",
    joinDate: "2022-01-15",
    phone: "+1 (555) 100-0002",
    location: "San Francisco, CA",
  },
  {
    id: "3",
    name: "Aisha Patel",
    role: "VP of Design",
    department: "Design",
    email: "aisha@nozom.com",
    avatar: "AP",
    status: "active",
    joinDate: "2022-03-01",
    phone: "+1 (555) 100-0003",
    location: "New York, NY",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Senior Engineer",
    department: "Engineering",
    email: "david@nozom.com",
    avatar: "DK",
    status: "away",
    joinDate: "2022-06-10",
    phone: "+1 (555) 100-0004",
    location: "Seattle, WA",
  },
  {
    id: "5",
    name: "Emma Wilson",
    role: "Product Manager",
    department: "Product",
    email: "emma@nozom.com",
    avatar: "EW",
    status: "active",
    joinDate: "2022-09-01",
    phone: "+1 (555) 100-0005",
    location: "San Francisco, CA",
  },
  {
    id: "6",
    name: "James Rodriguez",
    role: "Frontend Engineer",
    department: "Engineering",
    email: "james@nozom.com",
    avatar: "JR",
    status: "active",
    joinDate: "2023-01-15",
    phone: "+1 (555) 100-0006",
    location: "Austin, TX",
  },
  {
    id: "7",
    name: "Fatima Al-Hassan",
    role: "UX Researcher",
    department: "Design",
    email: "fatima@nozom.com",
    avatar: "FA",
    status: "offline",
    joinDate: "2023-03-20",
    phone: "+1 (555) 100-0007",
    location: "Chicago, IL",
  },
  {
    id: "8",
    name: "Tom Bradley",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "tom@nozom.com",
    avatar: "TB",
    status: "active",
    joinDate: "2023-05-10",
    phone: "+1 (555) 100-0008",
    location: "Denver, CO",
  },
  {
    id: "9",
    name: "Lisa Chang",
    role: "Marketing Lead",
    department: "Marketing",
    email: "lisa@nozom.com",
    avatar: "LC",
    status: "active",
    joinDate: "2023-07-01",
    phone: "+1 (555) 100-0009",
    location: "Los Angeles, CA",
  },
  {
    id: "10",
    name: "Omar Hassan",
    role: "Backend Engineer",
    department: "Engineering",
    email: "omar@nozom.com",
    avatar: "OH",
    status: "active",
    joinDate: "2023-09-15",
    phone: "+1 (555) 100-0010",
    location: "Remote",
  },
  {
    id: "11",
    name: "Rachel Green",
    role: "HR Manager",
    department: "People",
    email: "rachel@nozom.com",
    avatar: "RG",
    status: "active",
    joinDate: "2022-04-01",
    phone: "+1 (555) 100-0011",
    location: "San Francisco, CA",
  },
  {
    id: "12",
    name: "Yuki Tanaka",
    role: "Data Scientist",
    department: "Engineering",
    email: "yuki@nozom.com",
    avatar: "YT",
    status: "away",
    joinDate: "2023-11-01",
    phone: "+1 (555) 100-0012",
    location: "San Francisco, CA",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    name: "NozomOS Platform v2.0",
    description: "Major platform redesign with new dashboard, improved performance, and mobile support.",
    status: "active",
    progress: 68,
    team: ["Marcus Johnson", "David Kim", "James Rodriguez", "Omar Hassan"],
    deadline: "2026-04-15",
    priority: "high",
    tasks: [
      { id: "t1", title: "Redesign dashboard layout", assignee: "James Rodriguez", status: "done", priority: "high", dueDate: "2026-02-01" },
      { id: "t2", title: "Implement new API endpoints", assignee: "Omar Hassan", status: "in-progress", priority: "high", dueDate: "2026-02-28" },
      { id: "t3", title: "Mobile responsive overhaul", assignee: "James Rodriguez", status: "in-progress", priority: "medium", dueDate: "2026-03-15" },
      { id: "t4", title: "Performance optimization", assignee: "David Kim", status: "todo", priority: "high", dueDate: "2026-03-30" },
      { id: "t5", title: "User testing & QA", assignee: "Emma Wilson", status: "todo", priority: "medium", dueDate: "2026-04-10" },
    ],
  },
  {
    id: "2",
    name: "Brand Refresh Campaign",
    description: "Complete brand identity refresh including new logo, color palette, and marketing materials.",
    status: "active",
    progress: 45,
    team: ["Aisha Patel", "Lisa Chang", "Fatima Al-Hassan"],
    deadline: "2026-03-30",
    priority: "medium",
    tasks: [
      { id: "t6", title: "Logo design exploration", assignee: "Aisha Patel", status: "done", priority: "high", dueDate: "2026-01-20" },
      { id: "t7", title: "Color palette finalization", assignee: "Aisha Patel", status: "review", priority: "medium", dueDate: "2026-02-10" },
      { id: "t8", title: "Marketing collateral design", assignee: "Lisa Chang", status: "in-progress", priority: "medium", dueDate: "2026-03-01" },
      { id: "t9", title: "User research on brand perception", assignee: "Fatima Al-Hassan", status: "todo", priority: "low", dueDate: "2026-03-15" },
    ],
  },
  {
    id: "3",
    name: "Infrastructure Migration",
    description: "Migrate all services to new cloud infrastructure with improved reliability and cost efficiency.",
    status: "active",
    progress: 30,
    team: ["Tom Bradley", "Marcus Johnson", "David Kim"],
    deadline: "2026-05-01",
    priority: "high",
    tasks: [
      { id: "t10", title: "Audit current infrastructure", assignee: "Tom Bradley", status: "done", priority: "high", dueDate: "2026-01-30" },
      { id: "t11", title: "Design new architecture", assignee: "Marcus Johnson", status: "in-progress", priority: "high", dueDate: "2026-02-28" },
      { id: "t12", title: "Set up staging environment", assignee: "Tom Bradley", status: "todo", priority: "medium", dueDate: "2026-03-15" },
      { id: "t13", title: "Data migration plan", assignee: "David Kim", status: "todo", priority: "high", dueDate: "2026-03-30" },
      { id: "t14", title: "Production cutover", assignee: "Tom Bradley", status: "todo", priority: "high", dueDate: "2026-04-20" },
    ],
  },
  {
    id: "4",
    name: "Employee Onboarding Revamp",
    description: "Redesign the employee onboarding experience with automated workflows and better documentation.",
    status: "planning",
    progress: 10,
    team: ["Rachel Green", "Emma Wilson"],
    deadline: "2026-06-01",
    priority: "medium",
    tasks: [
      { id: "t15", title: "Map current onboarding process", assignee: "Rachel Green", status: "in-progress", priority: "medium", dueDate: "2026-02-15" },
      { id: "t16", title: "Design new workflow", assignee: "Emma Wilson", status: "todo", priority: "medium", dueDate: "2026-03-01" },
    ],
  },
  {
    id: "5",
    name: "Analytics Dashboard",
    description: "Build a comprehensive analytics dashboard for tracking key business metrics.",
    status: "completed",
    progress: 100,
    team: ["Yuki Tanaka", "James Rodriguez"],
    deadline: "2026-01-15",
    priority: "medium",
    tasks: [
      { id: "t17", title: "Define key metrics", assignee: "Yuki Tanaka", status: "done", priority: "high", dueDate: "2025-11-15" },
      { id: "t18", title: "Build data pipeline", assignee: "Yuki Tanaka", status: "done", priority: "high", dueDate: "2025-12-15" },
      { id: "t19", title: "Frontend implementation", assignee: "James Rodriguez", status: "done", priority: "medium", dueDate: "2026-01-10" },
    ],
  },
];

export const wikiArticles: WikiArticle[] = [
  {
    id: "1",
    title: "Getting Started at Nozom",
    category: "Onboarding",
    content: "Welcome to Nozom! This guide will walk you through your first week, including setting up your development environment, meeting your team, and understanding our company culture. Start by reviewing the company handbook and completing your onboarding checklist.",
    author: "Rachel Green",
    lastUpdated: "2026-01-20",
    tags: ["onboarding", "new-hire", "getting-started"],
  },
  {
    id: "2",
    title: "Engineering Best Practices",
    category: "Engineering",
    content: "Our engineering team follows industry best practices including code reviews, CI/CD pipelines, and comprehensive testing. All code must go through peer review before merging. We use trunk-based development with short-lived feature branches.",
    author: "Marcus Johnson",
    lastUpdated: "2026-01-15",
    tags: ["engineering", "best-practices", "code-review"],
  },
  {
    id: "3",
    title: "Design System Guidelines",
    category: "Design",
    content: "Our design system ensures consistency across all products. It includes typography scales, color palettes, spacing systems, and component libraries. All new features should use components from our shared design library before creating custom ones.",
    author: "Aisha Patel",
    lastUpdated: "2026-01-10",
    tags: ["design", "ui", "components", "style-guide"],
  },
  {
    id: "4",
    title: "Remote Work Policy",
    category: "Policies",
    content: "Nozom supports a hybrid work model. Team members can work remotely up to 3 days per week. Core collaboration hours are 10am-3pm PT. All remote workers should ensure they have a reliable internet connection and a quiet workspace.",
    author: "Rachel Green",
    lastUpdated: "2025-12-01",
    tags: ["remote", "policy", "hybrid", "work-from-home"],
  },
  {
    id: "5",
    title: "Product Development Lifecycle",
    category: "Product",
    content: "Our product development follows a structured lifecycle: Discovery, Definition, Design, Development, Testing, Launch, and Iteration. Each phase has specific deliverables and review gates. Product managers own the roadmap and prioritization.",
    author: "Emma Wilson",
    lastUpdated: "2026-02-01",
    tags: ["product", "lifecycle", "process", "development"],
  },
  {
    id: "6",
    title: "Security & Compliance",
    category: "Engineering",
    content: "All team members must follow our security guidelines. This includes using 2FA, encrypting sensitive data, following the principle of least privilege, and reporting any security incidents immediately. Annual security training is mandatory.",
    author: "Tom Bradley",
    lastUpdated: "2026-01-25",
    tags: ["security", "compliance", "privacy", "infosec"],
  },
  {
    id: "7",
    title: "Benefits & Perks Guide",
    category: "People",
    content: "Nozom offers comprehensive benefits including health insurance, 401(k) matching, unlimited PTO, learning stipends, home office budget, and wellness programs. Review the full benefits package in your onboarding materials.",
    author: "Rachel Green",
    lastUpdated: "2026-01-05",
    tags: ["benefits", "perks", "compensation", "hr"],
  },
  {
    id: "8",
    title: "Data Analytics Playbook",
    category: "Engineering",
    content: "Our data analytics stack includes a modern data warehouse, ETL pipelines, and visualization tools. This playbook covers how to request data, build dashboards, and interpret key metrics. All data requests should go through the analytics team.",
    author: "Yuki Tanaka",
    lastUpdated: "2026-02-03",
    tags: ["data", "analytics", "metrics", "dashboards"],
  },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Q1 2026 All-Hands Meeting",
    content: "Join us for our Q1 All-Hands meeting this Friday at 2pm PT. We'll be reviewing our Q4 results, sharing the roadmap for 2026, and celebrating team achievements. The meeting will be held in the main conference room and streamed live for remote team members.",
    author: "Sarah Chen",
    date: "2026-02-07",
    type: "general",
    pinned: true,
  },
  {
    id: "2",
    title: "Welcome New Team Members!",
    content: "Please join us in welcoming our newest team members who joined in January: Alex Rivera (Engineering), Priya Sharma (Design), and Carlos Mendez (Marketing). Say hello when you see them!",
    author: "Rachel Green",
    date: "2026-02-05",
    type: "celebration",
    pinned: false,
  },
  {
    id: "3",
    title: "System Maintenance - Feb 15",
    content: "Scheduled maintenance window on February 15th from 11pm-3am PT. Internal tools including email, Slack, and the wiki may experience brief interruptions. Please save your work before the maintenance window.",
    author: "Tom Bradley",
    date: "2026-02-04",
    type: "urgent",
    pinned: true,
  },
  {
    id: "4",
    title: "New Design System v3.0 Released",
    content: "The Design team is excited to announce the release of Design System v3.0! This update includes new components, improved accessibility, dark mode support, and updated documentation. Check the wiki for migration guides.",
    author: "Aisha Patel",
    date: "2026-02-03",
    type: "update",
    pinned: false,
  },
  {
    id: "5",
    title: "Annual Team Retreat - Save the Date",
    content: "Mark your calendars! Our annual team retreat is scheduled for April 10-12 in Lake Tahoe. More details on activities, accommodation, and travel arrangements will be shared soon.",
    author: "Sarah Chen",
    date: "2026-01-28",
    type: "celebration",
    pinned: false,
  },
  {
    id: "6",
    title: "Updated PTO Policy",
    content: "We've updated our PTO policy to include additional mental health days. Each team member now has 3 dedicated mental health days per quarter in addition to unlimited PTO. Please review the updated policy on the wiki.",
    author: "Rachel Green",
    date: "2026-01-20",
    type: "update",
    pinned: false,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Q1 All-Hands Meeting",
    date: "2026-02-07",
    time: "14:00",
    duration: "1.5h",
    type: "meeting",
    attendees: ["All Company"],
    location: "Main Conference Room / Zoom",
  },
  {
    id: "2",
    title: "Engineering Sprint Planning",
    date: "2026-02-10",
    time: "10:00",
    duration: "1h",
    type: "meeting",
    attendees: ["Engineering Team"],
    location: "Eng Room A",
  },
  {
    id: "3",
    title: "Design Review - Brand Refresh",
    date: "2026-02-11",
    time: "11:00",
    duration: "45m",
    type: "meeting",
    attendees: ["Aisha Patel", "Lisa Chang", "Sarah Chen"],
    location: "Design Studio",
  },
  {
    id: "4",
    title: "Platform v2.0 Milestone",
    date: "2026-02-14",
    time: "23:59",
    duration: "-",
    type: "deadline",
    attendees: ["Engineering Team"],
    location: "-",
  },
  {
    id: "5",
    title: "System Maintenance Window",
    date: "2026-02-15",
    time: "23:00",
    duration: "4h",
    type: "event",
    attendees: ["Tom Bradley"],
    location: "Remote",
  },
  {
    id: "6",
    title: "Presidents' Day",
    date: "2026-02-16",
    time: "00:00",
    duration: "All day",
    type: "holiday",
    attendees: ["All Company"],
    location: "-",
  },
  {
    id: "7",
    title: "1:1 Sarah & Marcus",
    date: "2026-02-10",
    time: "09:00",
    duration: "30m",
    type: "meeting",
    attendees: ["Sarah Chen", "Marcus Johnson"],
    location: "CEO Office",
  },
  {
    id: "8",
    title: "Product Roadmap Review",
    date: "2026-02-12",
    time: "14:00",
    duration: "1h",
    type: "meeting",
    attendees: ["Emma Wilson", "Sarah Chen", "Marcus Johnson", "Aisha Patel"],
    location: "Board Room",
  },
  {
    id: "9",
    title: "Lunch & Learn: AI in Production",
    date: "2026-02-13",
    time: "12:00",
    duration: "1h",
    type: "event",
    attendees: ["Open to All"],
    location: "Kitchen / Zoom",
  },
  {
    id: "10",
    title: "Brand Refresh Deadline",
    date: "2026-03-30",
    time: "23:59",
    duration: "-",
    type: "deadline",
    attendees: ["Design Team", "Marketing"],
    location: "-",
  },
  {
    id: "11",
    title: "Team Retreat",
    date: "2026-04-10",
    time: "09:00",
    duration: "3 days",
    type: "event",
    attendees: ["All Company"],
    location: "Lake Tahoe",
  },
  {
    id: "12",
    title: "Weekly Standup",
    date: "2026-02-10",
    time: "09:30",
    duration: "15m",
    type: "meeting",
    attendees: ["All Company"],
    location: "Main Room / Zoom",
  },
];

// Dashboard metrics
export const metrics = {
  totalEmployees: employees.length,
  activeProjects: projects.filter((p) => p.status === "active").length,
  completedProjects: projects.filter((p) => p.status === "completed").length,
  openTasks: projects.flatMap((p) => p.tasks).filter((t) => t.status !== "done").length,
  departments: [...new Set(employees.map((e) => e.department))].length,
  upcomingEvents: calendarEvents.filter((e) => new Date(e.date) >= new Date("2026-02-07")).length,
};
