
import { Project } from "../models/Project";
import projectRepository from "../repositories/ProjectRepository";
import { TeamMember, Milestone } from "@/components/project/ProjectData";

class ProjectService {
  async getAllProjects(): Promise<Project[]> {
    // In a real implementation, this would be an API call
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return projectRepository.getAllProjects();
  }

  async getProjectById(id: string): Promise<Project | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return projectRepository.getProjectById(id) || null;
  }

  async getProjectDetails(id: string): Promise<{
    project: Project | null;
    team: TeamMember[];
    milestones: Milestone[];
  }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const project = projectRepository.getProjectById(id);
    const team = project ? projectRepository.getTeamMembersForProject(id) : [];
    const milestones = project ? projectRepository.getMilestonesForProject(id) : [];
    
    return {
      project: project || null,
      team,
      milestones
    };
  }

  async createProject(
    projectData: Partial<Project>, 
    team?: TeamMember[], 
    milestones?: Milestone[]
  ): Promise<Project> {
    // Create a new project instance
    const project = Project.fromFormData(projectData, projectData.createdBy);
    
    // Add the project to the repository
    projectRepository.addProject(project, team, milestones);
    
    // In a real implementation, this would save to a database
    await projectRepository.saveToDatabase();
    
    return project;
  }

  async investInProject(projectId: string, amount: number): Promise<Project | null> {
    const project = projectRepository.getProjectById(projectId);
    
    if (!project) {
      return null;
    }
    
    // Update project with new investment
    project.addInvestment(amount);
    projectRepository.updateProject(project);
    
    // Save changes
    await projectRepository.saveToDatabase();
    
    return project;
  }
}

// Export a singleton instance
const projectService = new ProjectService();
export default projectService;
