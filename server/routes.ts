import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertCompanyContentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Company content routes
  app.get("/api/company-content", async (req, res) => {
    try {
      const content = await storage.getAllCompanyContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company content" });
    }
  });

  app.get("/api/company-content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getCompanyContent(section);
      if (!content) {
        return res.status(404).json({ message: "Content section not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company content" });
    }
  });

  app.post("/api/company-content", async (req, res) => {
    try {
      const validatedData = insertCompanyContentSchema.parse(req.body);
      const content = await storage.createOrUpdateCompanyContent(validatedData);
      res.json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update company content" });
    }
  });

  // Contact form submission
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json({ 
        message: "Thank you for your inquiry. We'll get back to you soon!",
        inquiry: { id: inquiry.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  // Get all inquiries (for admin)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
