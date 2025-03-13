
import { Project } from "../models/Project";
import { TeamMember, Milestone } from "@/components/project/ProjectData";

// Mock initial data - this simulates data loaded from a DB
import { mockProjects, teamMembers, milestones } from "@/components/project/ProjectData";

export class ProjectRepository {
  private projects: Map<string, Project>;
  private teamMembers: Map<string, TeamMember[]>;
  private milestones: Map<string, Milestone[]>;

  constructor() {
    // Initialize with mock data for now
    this.projects = new Map();
    this.teamMembers = new Map();
    this.milestones = new Map();
    
    // Convert mock data to Project instances
    Object.entries(mockProjects).forEach(([id, data]) => {
      this.projects.set(id, new Project({
        ...data,
        id,
        createdAt: new Date(Date.now() - Math.random() * 10000000000) // Random past date
      }));
    });

    // Load team and milestone data
    Object.entries(teamMembers).forEach(([id, members]) => {
      this.teamMembers.set(id, members);
    });

    Object.entries(milestones).forEach(([id, ms]) => {
      this.milestones.set(id, ms);
    });
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getTeamMembersForProject(projectId: string): TeamMember[] {
    return this.teamMembers.get(projectId) || [];
  }

  getMilestonesForProject(projectId: string): Milestone[] {
    return this.milestones.get(projectId) || [];
  }

  addProject(project: Project, team?: TeamMember[], projectMilestones?: Milestone[]): Project {
    // Ensure we have a valid ID
    if (!project.id) {
      project.id = crypto.randomUUID();
    }

    // Store the project
    this.projects.set(project.id, project);
    
    // Store team members if provided
    if (team && team.length > 0) {
      this.teamMembers.set(project.id, team);
    }
    
    // Store milestones if provided
    if (projectMilestones && projectMilestones.length > 0) {
      this.milestones.set(project.id, projectMilestones);
    }

    return project;
  }

  updateProject(project: Project): Project {
    this.projects.set(project.id, project);
    return project;
  }

  deleteProject(id: string): boolean {
    // Delete all related data
    this.teamMembers.delete(id);
    this.milestones.delete(id);
    return this.projects.delete(id);
  }

  // This would connect to a real DB in production
  async saveToDatabase(): Promise<void> {
    // In a real implementation, this would save to an actual database
    console.log("Saving to database...", this.projects.size, "projects");
    
    // Simulate database latency
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Create a singleton instance
const projectRepository = new ProjectRepository();
export default projectRepository;
