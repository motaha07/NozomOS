import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  department: z.string().min(1, "Department is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(30),
  location: z.string().min(1, "Location is required").max(100),
  status: z.enum(["active", "away", "offline"]).default("active"),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().min(1, "Description is required").max(1000),
  status: z.enum(["active", "completed", "on-hold", "planning"]).default("planning"),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  deadline: z.string().min(1, "Deadline is required"),
  memberIds: z.array(z.string()).optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  status: z.enum(["todo", "in-progress", "review", "done"]).default("todo"),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  dueDate: z.string().min(1, "Due date is required"),
  projectId: z.string().min(1, "Project is required"),
  assigneeId: z.string().min(1, "Assignee is required"),
});

export const wikiArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  category: z.string().min(1, "Category is required").max(50),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).default([]),
});

export const announcementSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  type: z.enum(["general", "urgent", "celebration", "update"]).default("general"),
  pinned: z.boolean().default(false),
});

export const calendarEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  type: z.enum(["meeting", "deadline", "event", "holiday"]).default("meeting"),
  attendees: z.array(z.string()).default([]),
  location: z.string().min(1, "Location is required").max(200),
});

export const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});
