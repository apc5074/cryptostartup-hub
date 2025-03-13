
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Wallet, Clock, Users, Award, BookmarkPlus, Share2 } from "lucide-react";
import { Project } from "@/components/ProjectCard";
import { useToast } from "@/components/ui/use-toast";

interface ProjectSidebarProps {
  project: Project;
  onInvest: () => void;
}

const ProjectSidebar = ({ project, onInvest }: ProjectSidebarProps) => {
  const { toast } = useToast();
  const percentFunded = Math.min(Math.round((project.raisedAmount / project.targetAmount) * 100), 100);
  
  return (
    <div className="animate-fade-up animation-delay-200">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
        <div className="space-y-6">
          {/* Funding Progress */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">${project.raisedAmount.toLocaleString()}</h3>
                <p className="text-gray-500 text-sm">raised of ${project.targetAmount.toLocaleString()}</p>
              </div>
              <span className="text-primary font-medium">{percentFunded}%</span>
            </div>
            <Progress value={percentFunded} className="h-2" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <Users className="h-5 w-5 mx-auto text-gray-500 mb-1" />
              <div className="font-medium text-gray-900">{project.investors}</div>
              <div className="text-xs text-gray-500">Investors</div>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto text-gray-500 mb-1" />
              <div className="font-medium text-gray-900">{project.daysLeft}</div>
              <div className="text-xs text-gray-500">Days Left</div>
            </div>
            <div className="text-center">
              <LineChart className="h-5 w-5 mx-auto text-gray-500 mb-1" />
              <div className="font-medium text-gray-900">${project.tokenPrice}</div>
              <div className="text-xs text-gray-500">Token Price</div>
            </div>
          </div>
          
          {/* Token Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Token Information</h4>
              <Badge>{project.tokenSymbol}</Badge>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900">Equity Token</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Chain:</span>
                <span className="text-gray-900">Ethereum</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Min. Investment:</span>
                <span className="text-gray-900">${project.minInvestment?.toLocaleString()}</span>
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full"
              onClick={onInvest}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Invest Now
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Added to Watchlist",
                    description: `${project.name} has been added to your watchlist.`,
                    duration: 3000,
                  });
                }}
              >
                <BookmarkPlus className="mr-1 h-4 w-4" />
                Watchlist
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Share Link Copied",
                    description: "Project link copied to clipboard.",
                    duration: 3000,
                  });
                }}
              >
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Verified */}
          <div className="flex items-center pt-4 border-t border-gray-100">
            <Award className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-600">
              Verified by CryptoStartup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSidebar;
