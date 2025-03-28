
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestmentModal from "@/components/InvestmentModal";
import { Project } from "@/backend/models/Project";
import projectService from "@/backend/services/ProjectService";

// Import refactored components
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectTeam from "@/components/project/ProjectTeam";
import ProjectRoadmap from "@/components/project/ProjectRoadmap";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import LoadingState from "@/components/project/LoadingState";
import ProjectNotFound from "@/components/project/ProjectNotFound";
import { TeamMember, Milestone } from "@/components/project/ProjectData";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [milestoneData, setMilestoneData] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investModalOpen, setInvestModalOpen] = useState(false);
  
  useEffect(() => {
    // Use our service to fetch project details
    const fetchProjectDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { project, team, milestones } = await projectService.getProjectDetails(id);
        setProject(project);
        setTeamData(team);
        setMilestoneData(milestones);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjectDetails();
  }, [id]);
  
  // Handle investment 
  const handleInvestment = async (amount: number) => {
    if (!id || !project) return;
    
    try {
      const updatedProject = await projectService.investInProject(id, amount);
      if (updatedProject) {
        setProject(updatedProject);
      }
    } catch (error) {
      console.error("Error processing investment:", error);
    }
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!project) {
    return <ProjectNotFound />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-transition">
          <ProjectHeader project={project} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Info - Left Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <ProjectOverview project={project} />
                </TabsContent>
                
                <TabsContent value="team">
                  <ProjectTeam teamData={teamData} />
                </TabsContent>
                
                <TabsContent value="roadmap">
                  <ProjectRoadmap milestoneData={milestoneData} />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Investment Info - Right Column */}
            <ProjectSidebar 
              project={project} 
              onInvest={() => setInvestModalOpen(true)} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Investment Modal */}
      <InvestmentModal 
        open={investModalOpen} 
        onOpenChange={setInvestModalOpen} 
        project={project}
      />
    </div>
  );
};

export default ProjectDetail;
