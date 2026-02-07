"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
    { id: "integrations", label: "Integrations" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your NozomOS preferences and configurations
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-2xl">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
        {activeTab === "integrations" && <IntegrationSettings />}
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Company Information</h3>
        <div className="space-y-4">
          <SettingField label="Company Name" value="Nozom" type="text" />
          <SettingField label="Domain" value="nozom.com" type="text" />
          <SettingField label="Industry" value="Technology" type="text" />
          <SettingField label="Company Size" value="12 employees" type="text" />
          <SettingField label="Timezone" value="America/Los_Angeles (PT)" type="text" />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Workspace</h3>
        <div className="space-y-4">
          <SettingField label="Workspace URL" value="nozom.nozomos.app" type="text" />
          <SettingField label="Default Language" value="English (US)" type="text" />
          <SettingToggle label="Allow public wiki pages" description="Let non-members view wiki articles marked as public" defaultOn={false} />
          <SettingToggle label="Require 2FA" description="Require two-factor authentication for all team members" defaultOn={true} />
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Email Notifications</h3>
        <div className="space-y-4">
          <SettingToggle label="Announcements" description="Receive email for new company announcements" defaultOn={true} />
          <SettingToggle label="Task assignments" description="Get notified when assigned to a new task" defaultOn={true} />
          <SettingToggle label="Project updates" description="Receive updates on projects you're a member of" defaultOn={true} />
          <SettingToggle label="Calendar reminders" description="Get email reminders before scheduled events" defaultOn={true} />
          <SettingToggle label="Wiki changes" description="Notify when wiki articles you follow are updated" defaultOn={false} />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">In-App Notifications</h3>
        <div className="space-y-4">
          <SettingToggle label="Desktop notifications" description="Show browser notifications for important updates" defaultOn={true} />
          <SettingToggle label="Sound alerts" description="Play a sound for new notifications" defaultOn={false} />
          <SettingToggle label="Weekly digest" description="Receive a weekly summary of activity" defaultOn={true} />
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          <ThemeOption name="Light" active={true} colors={["#ffffff", "#f8fafc", "#0f172a"]} />
          <ThemeOption name="Dark" active={false} colors={["#0f172a", "#1e293b", "#e2e8f0"]} />
          <ThemeOption name="System" active={false} colors={["#ffffff", "#0f172a", "#3b82f6"]} />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Accent Color</h3>
        <div className="flex gap-3">
          {["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-amber-500", "bg-red-500", "bg-pink-500"].map((color, i) => (
            <button
              key={color}
              className={`h-8 w-8 rounded-full ${color} ${i === 0 ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Layout</h3>
        <div className="space-y-4">
          <SettingToggle label="Compact mode" description="Reduce spacing and padding throughout the interface" defaultOn={false} />
          <SettingToggle label="Show sidebar labels" description="Display text labels next to sidebar icons" defaultOn={true} />
        </div>
      </div>
    </div>
  );
}

function IntegrationSettings() {
  const integrations = [
    { name: "Slack", description: "Send notifications and updates to Slack channels", connected: true },
    { name: "GitHub", description: "Link repositories and track pull requests", connected: true },
    { name: "Google Workspace", description: "Sync calendar events and documents", connected: false },
    { name: "Jira", description: "Import and sync project tasks", connected: false },
    { name: "Figma", description: "Embed design files and prototypes", connected: true },
    { name: "Notion", description: "Import documents and databases", connected: false },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Connected Services</h3>
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between rounded-lg border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                  {integration.name[0]}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{integration.name}</p>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <button
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  integration.connected
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-muted text-muted-foreground hover:bg-slate-200"
                }`}
              >
                {integration.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingField({ label, value, type }: { label: string; value: string; type: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-card-foreground">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function SettingToggle({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultOn);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeOption({
  name,
  active,
  colors,
}: {
  name: string;
  active: boolean;
  colors: string[];
}) {
  return (
    <button
      className={`rounded-lg border-2 p-3 text-center transition-colors ${
        active ? "border-primary" : "border-border hover:border-slate-300"
      }`}
    >
      <div className="mb-2 flex justify-center gap-1">
        {colors.map((color, i) => (
          <span
            key={i}
            className="h-4 w-4 rounded-full border border-slate-200"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-card-foreground">{name}</p>
    </button>
  );
}
