
import { Project } from "@/components/ProjectCard";

interface ProjectOverviewProps {
  project: Project;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="prose max-w-none">
        {project.description.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
