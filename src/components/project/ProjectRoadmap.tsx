
import { Badge } from "@/components/ui/badge";

interface Milestone {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface ProjectRoadmapProps {
  milestoneData: Milestone[];
}

const ProjectRoadmap = ({ milestoneData }: ProjectRoadmapProps) => {
  return (
    <div className="animate-fade-in">
      <div className="space-y-6">
        {milestoneData.map((milestone, index) => (
          <div key={index} className="relative pl-8 pb-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-0 before:w-px before:bg-gray-200">
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              milestone.completed 
                ? 'bg-green-100 border-green-500 text-green-500' 
                : 'bg-gray-100 border-gray-300 text-gray-300'
            }`}>
              {milestone.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">{milestone.title}</h3>
                <Badge variant={milestone.completed ? "default" : "outline"}>
                  {milestone.date}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectRoadmap;
