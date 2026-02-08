import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | NozomOS",
    default: "NozomOS - Company Operating System",
  },
  description:
    "A modern company operating system for team collaboration, project management, and knowledge sharing.",
  openGraph: {
    title: "NozomOS - Company Operating System",
    description:
      "A modern company operating system for team collaboration, project management, and knowledge sharing.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="antialiased">
        {session ? (
          <div className="flex min-h-screen">
            <Sidebar
              userName={session.user?.name || "User"}
              userRole={
                (session.user as Record<string, unknown>)?.role === "admin"
                  ? "Administrator"
                  : "Team Member"
              }
              userAvatar={session.user?.image || "U"}
            />
            <main className="ml-0 flex-1 md:ml-64" id="main-content">
              {children}
            </main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
