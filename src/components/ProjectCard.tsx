
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Clock } from "lucide-react";

export interface Project {
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
  minInvestment?: number;
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const percentFunded = Math.min(Math.round((project.raisedAmount / project.targetAmount) * 100), 100);
  
  return (
    <Link 
      to={`/project/${project.id}`}
      className={`block overflow-hidden ${
        featured 
          ? 'rounded-xl shadow-xl' 
          : 'rounded-lg shadow-md hover-lift'
      } bg-white border border-gray-100 transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center transition-transform duration-500"
          style={{ 
            backgroundImage: `url(${project.imageUrl})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <Badge 
          className="absolute top-3 right-3 backdrop-blur-md bg-black/40 text-white border-none"
        >
          {project.category}
        </Badge>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.tagline}</p>
        </div>
        
        <div className="mt-4 mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-900">${project.raisedAmount.toLocaleString()}</span>
            <span className="text-primary font-medium">{percentFunded}%</span>
          </div>
          <Progress value={percentFunded} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Raised</span>
            <span>Goal: ${project.targetAmount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>${project.tokenPrice} {project.tokenSymbol}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3.5 w-3.5" />
            <span>{project.investors}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{project.daysLeft} days left</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
