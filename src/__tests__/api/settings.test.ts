/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    setting: {
      findMany: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

// Mock auth
jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

import { GET, PATCH } from "@/app/api/settings/route";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockAuth = auth as jest.MockedFunction<typeof auth>;

describe("Settings API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/settings", () => {
    it("returns settings as key-value map", async () => {
      (mockPrisma.setting.findMany as jest.Mock).mockResolvedValue([
        { id: "1", key: "companyName", value: "Nozom" },
        { id: "2", key: "timezone", value: "America/Los_Angeles" },
      ]);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        companyName: "Nozom",
        timezone: "America/Los_Angeles",
      });
    });

    it("returns 500 on database error", async () => {
      (mockPrisma.setting.findMany as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to fetch settings");
    });
  });

  describe("PATCH /api/settings", () => {
    it("returns 401 when not authenticated", async () => {
      mockAuth.mockResolvedValue(null as never);

      const request = new NextRequest("http://localhost/api/settings", {
        method: "PATCH",
        body: JSON.stringify({ companyName: "Test" }),
      });

      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("Unauthorized");
    });

    it("updates settings when authenticated", async () => {
      mockAuth.mockResolvedValue({ user: { id: "1" } } as never);
      (mockPrisma.setting.upsert as jest.Mock).mockResolvedValue({});
      (mockPrisma.setting.findMany as jest.Mock).mockResolvedValue([
        { id: "1", key: "companyName", value: "Updated" },
      ]);

      const request = new NextRequest("http://localhost/api/settings", {
        method: "PATCH",
        body: JSON.stringify({ companyName: "Updated" }),
      });

      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ companyName: "Updated" });
      expect(mockPrisma.setting.upsert).toHaveBeenCalledWith({
        where: { key: "companyName" },
        update: { value: "Updated" },
        create: { key: "companyName", value: "Updated" },
      });
    });

    it("returns 400 for invalid body", async () => {
      mockAuth.mockResolvedValue({ user: { id: "1" } } as never);

      const request = new NextRequest("http://localhost/api/settings", {
        method: "PATCH",
        body: JSON.stringify(null),
      });

      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("must be an object");
    });
  });
});
