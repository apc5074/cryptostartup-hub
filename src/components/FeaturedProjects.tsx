
import { useState, useEffect } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for featured projects
const mockFeaturedProjects: Project[] = [
  {
    id: '1',
    name: 'Decentralized Finance Platform',
    description: 'Building the next generation of DeFi applications with cross-chain compatibility and advanced yield optimization strategies. Our platform enables seamless asset transfers and intelligent yield farming across multiple blockchains.',
    tagline: 'Cross-chain DeFi platform with intelligent yield optimization',
    category: 'DeFi',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000',
    targetAmount: 1500000,
    raisedAmount: 1275000,
    investors: 421,
    daysLeft: 15,
    tokenSymbol: 'DFP',
    tokenPrice: 0.085
  },
  {
    id: '2',
    name: 'AR Metaverse Ecosystem',
    description: 'Creating an augmented reality metaverse that overlays digital experiences onto the physical world. Our ecosystem combines AR technology with blockchain to create persistent, ownable digital assets in real-world contexts.',
    tagline: 'Bridging digital and physical worlds through AR and blockchain',
    category: 'Metaverse',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000',
    targetAmount: 2000000,
    raisedAmount: 1450000,
    investors: 326,
    daysLeft: 21,
    tokenSymbol: 'ARME',
    tokenPrice: 0.125
  },
  {
    id: '3',
    name: 'Carbon Credit Blockchain',
    description: 'Revolutionizing the carbon credit market with blockchain verification and trading. Our platform ensures transparent tracking of carbon offsets and simplifies the process of buying, selling, and retiring carbon credits.',
    tagline: 'Transparent carbon credit verification and trading platform',
    category: 'GreenTech',
    imageUrl: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1000',
    targetAmount: 1000000,
    raisedAmount: 820000,
    investors: 254,
    daysLeft: 12,
    tokenSymbol: 'CCT',
    tokenPrice: 0.045
  }
];

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Simulate fetching data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProjects = () => {
      setTimeout(() => {
        setProjects(mockFeaturedProjects);
      }, 500);
    };
    
    fetchProjects();
  }, []);
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 animate-fade-up">Featured Projects</h2>
            <p className="mt-2 text-gray-600 max-w-2xl animate-fade-up animation-delay-100">
              Discover innovative startups raising funds through tokenized equity
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="group animate-fade-in">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        {projects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-lg overflow-hidden shadow-md bg-gray-100">
                <div className="h-48 bg-gray-200" />
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-2 bg-gray-200 rounded w-full mt-4 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`animate-fade-up animation-delay-${index * 100}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
