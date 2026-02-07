import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "NozomOS - Company Operating System",
  description: "A modern company operating system for team collaboration, project management, and knowledge sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-64 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
