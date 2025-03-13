
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { Project } from "@/components/ProjectCard";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
      </div>
      
      <div className="lg:col-span-2 animate-fade-up">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
          <img 
            src={project.imageUrl} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
          <Badge 
            className="absolute top-4 right-4 backdrop-blur-md bg-black/40 text-white border-none"
          >
            {project.category}
          </Badge>
        </div>
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="mt-2 text-xl text-gray-600">{project.tagline}</p>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
