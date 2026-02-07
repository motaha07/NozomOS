# NozomOS - Company Operating System

A modern, web-based company operating system built with Next.js, TypeScript, and Tailwind CSS. NozomOS provides a centralized hub for team collaboration, project management, knowledge sharing, and company communications.

## Features

- **Dashboard** — Company overview with key metrics, active projects, today's schedule, and team status
- **Team Directory** — Browse team members by department with contact info, roles, and availability status
- **Projects & Tasks** — Track projects with progress bars, task tables, priorities, and team assignments
- **Knowledge Base** — Company wiki with categorized articles, tags, and authorship tracking
- **Announcements** — Company-wide updates with pinned posts, urgency levels, and chronological feed
- **Calendar & Events** — Timeline view of meetings, deadlines, events, and holidays
- **Settings** — Configure company info, notifications, appearance themes, and third-party integrations

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Runtime:** React 19

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── dashboard/       # Dashboard with metrics and widgets
│   ├── team/            # Team directory by department
│   ├── projects/        # Projects and task management
│   ├── wiki/            # Knowledge base articles
│   ├── announcements/   # Company announcements feed
│   ├── calendar/        # Calendar and events timeline
│   ├── settings/        # App settings and preferences
│   ├── globals.css      # Global styles and theme
│   ├── layout.tsx       # Root layout with sidebar
│   └── page.tsx         # Redirects to dashboard
├── components/
│   └── Sidebar.tsx      # Navigation sidebar
└── lib/
    └── data.ts          # Sample data and TypeScript interfaces
```
