import { loginSchema, employeeSchema, projectSchema, taskSchema } from "@/lib/validations";

describe("Validation Schemas", () => {
  describe("loginSchema", () => {
    it("accepts valid credentials", () => {
      const result = loginSchema.safeParse({
        email: "admin@nozom.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty password", () => {
      const result = loginSchema.safeParse({
        email: "admin@nozom.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("employeeSchema", () => {
    const validEmployee = {
      name: "John Doe",
      role: "Developer",
      department: "Engineering",
      email: "john@nozom.com",
      phone: "+1-555-0100",
      location: "San Francisco, CA",
    };

    it("accepts valid employee data", () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it("rejects missing required fields", () => {
      const result = employeeSchema.safeParse({ name: "John" });
      expect(result.success).toBe(false);
    });

    it("rejects invalid email", () => {
      const result = employeeSchema.safeParse({
        ...validEmployee,
        email: "not-valid",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("projectSchema", () => {
    const validProject = {
      name: "Project Alpha",
      description: "A test project",
      deadline: "2025-12-31",
    };

    it("accepts valid project data", () => {
      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it("accepts optional fields", () => {
      const result = projectSchema.safeParse({
        ...validProject,
        status: "active",
        priority: "high",
        progress: 50,
      });
      expect(result.success).toBe(true);
    });

    it("rejects missing name", () => {
      const result = projectSchema.safeParse({
        description: "A test project",
        deadline: "2025-12-31",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("taskSchema", () => {
    const validTask = {
      title: "Implement feature",
      projectId: "project-1",
      assigneeId: "emp-1",
      dueDate: "2025-06-15",
    };

    it("accepts valid task data", () => {
      const result = taskSchema.safeParse(validTask);
      expect(result.success).toBe(true);
    });

    it("accepts optional status and priority", () => {
      const result = taskSchema.safeParse({
        ...validTask,
        status: "in-progress",
        priority: "high",
      });
      expect(result.success).toBe(true);
    });

    it("rejects missing required fields", () => {
      const result = taskSchema.safeParse({ title: "Test" });
      expect(result.success).toBe(false);
    });
  });
});
