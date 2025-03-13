
import { TeamMember, Milestone } from "@/components/project/ProjectData";

export class Project {
  id: string;
  name: string;
  description: string;
  tagline: string;
  category: string;
  imageUrl: string;
  targetAmount: number;
  raisedAmount: number;
  investors: number;
  daysLeft: number;
  tokenSymbol: string;
  tokenPrice: number;
  minInvestment: number;
  createdBy?: string;
  createdAt: Date;

  constructor(data: Partial<Project>) {
    this.id = data.id || crypto.randomUUID();
    this.name = data.name || '';
    this.description = data.description || '';
    this.tagline = data.tagline || '';
    this.category = data.category || '';
    this.imageUrl = data.imageUrl || '';
    this.targetAmount = data.targetAmount || 0;
    this.raisedAmount = data.raisedAmount || 0;
    this.investors = data.investors || 0;
    this.daysLeft = data.daysLeft || 30;
    this.tokenSymbol = data.tokenSymbol || '';
    this.tokenPrice = data.tokenPrice || 0;
    this.minInvestment = data.minInvestment || 0;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt || new Date();
  }

  static fromFormData(formData: any, createdBy?: string): Project {
    return new Project({
      ...formData,
      id: crypto.randomUUID(),
      raisedAmount: 0,
      investors: 0,
      createdBy,
      createdAt: new Date()
    });
  }

  calculateProgress(): number {
    return (this.raisedAmount / this.targetAmount) * 100;
  }

  addInvestment(amount: number): void {
    this.raisedAmount += amount;
    this.investors += 1;
  }
}
