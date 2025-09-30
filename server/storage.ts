import { type User, type InsertUser, type CompanyContent, type InsertCompanyContent, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCompanyContent(section: string): Promise<CompanyContent | undefined>;
  createOrUpdateCompanyContent(content: InsertCompanyContent): Promise<CompanyContent>;
  getAllCompanyContent(): Promise<CompanyContent[]>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private companyContent: Map<string, CompanyContent>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.companyContent = new Map();
    this.inquiries = new Map();
    
    // Initialize with default company content
    this.initializeDefaultContent();
  }

  private initializeDefaultContent() {
    const defaultContent = [
      {
        section: "about",
        content: {
          title: "About TechFlow Solutions",
          description: "Founded with a vision to transform businesses through innovative technology solutions, TechFlow Solutions has emerged as a leading partner for companies seeking digital transformation. Our team of expert developers, architects, and consultants brings together decades of experience in delivering cutting-edge solutions.",
          mission: "To empower businesses through innovative technology solutions and digital transformation strategies that drive sustainable growth.",
          values: ["Innovation First", "Client Success", "Quality Excellence", "Continuous Learning"],
          stats: {
            projectsDelivered: "250+",
            clientSatisfaction: "95%",
            teamMembers: "50+",
            yearsExperience: "8"
          }
        }
      },
      {
        section: "contact",
        content: {
          email: "hello@techflowsolutions.com",
          phone: "+1 (555) 123-4567",
          address: "San Francisco, CA",
          socialMedia: {
            linkedin: "#",
            twitter: "#",
            github: "#",
            instagram: "#"
          }
        }
      }
    ];

    defaultContent.forEach(item => {
      const content: CompanyContent = {
        id: randomUUID(),
        section: item.section,
        content: item.content,
        lastUpdated: new Date()
      };
      this.companyContent.set(item.section, content);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCompanyContent(section: string): Promise<CompanyContent | undefined> {
    return this.companyContent.get(section);
  }

  async createOrUpdateCompanyContent(insertContent: InsertCompanyContent): Promise<CompanyContent> {
    const existing = this.companyContent.get(insertContent.section);
    const content: CompanyContent = {
      id: existing?.id || randomUUID(),
      ...insertContent,
      lastUpdated: new Date(),
    };
    this.companyContent.set(insertContent.section, content);
    return content;
  }

  async getAllCompanyContent(): Promise<CompanyContent[]> {
    return Array.from(this.companyContent.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      ...insertInquiry,
      company: insertInquiry.company || null,
      id,
      createdAt: new Date(),
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
