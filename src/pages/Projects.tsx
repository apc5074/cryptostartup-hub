import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowDownUp, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard, { Project } from "@/components/ProjectCard";
import CreateProjectCard from "@/components/project/CreateProjectCard";
import { useWallet } from "@/context/WalletContext";

const mockAllProjects: Project[] = [
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
  },
  {
    id: '4',
    name: 'Decentralized Cloud Storage',
    description: 'Providing secure, encrypted cloud storage through a decentralized network of nodes. Users can store their data across multiple nodes, ensuring redundancy and protection from censorship or single points of failure.',
    tagline: 'Encrypted storage across a decentralized network',
    category: 'Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1000',
    targetAmount: 1200000,
    raisedAmount: 645000,
    investors: 178,
    daysLeft: 30,
    tokenSymbol: 'DCS',
    tokenPrice: 0.032
  },
  {
    id: '5',
    name: 'AI-Powered NFT Creation',
    description: 'Using artificial intelligence to generate unique, collectible NFTs. Our platform allows anyone to create stunning digital art without artistic skills, and each creation is verified and minted on the blockchain.',
    tagline: 'Generate and mint AI-created NFTs instantly',
    category: 'NFT',
    imageUrl: 'https://images.unsplash.com/photo-1639322537231-2f206e06af84?q=80&w=1000',
    targetAmount: 800000,
    raisedAmount: 580000,
    investors: 312,
    daysLeft: 8,
    tokenSymbol: 'AINFT',
    tokenPrice: 0.075
  },
  {
    id: '6',
    name: 'Blockchain Gaming Platform',
    description: 'Creating an ecosystem for blockchain-based games with true ownership of in-game assets. Our platform provides developers with tools to create games where players can earn, trade, and own their items across multiple games.',
    tagline: 'True ownership of in-game assets through blockchain',
    category: 'Gaming',
    imageUrl: 'https://images.unsplash.com/photo-1640235708485-8663eb8cbdee?q=80&w=1000',
    targetAmount: 1750000,
    raisedAmount: 1150000,
    investors: 437,
    daysLeft: 18,
    tokenSymbol: 'BGP',
    tokenPrice: 0.095
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { isConnected } = useWallet();
  
  useEffect(() => {
    const fetchProjects = () => {
      setIsLoading(true);
      setTimeout(() => {
        let filteredProjects = [...mockAllProjects];
        
        if (searchQuery) {
          filteredProjects = filteredProjects.filter(project => 
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (categoryFilter !== 'all') {
          filteredProjects = filteredProjects.filter(project => 
            project.category.toLowerCase() === categoryFilter.toLowerCase()
          );
        }
        
        if (sortBy === 'newest') {
        } else if (sortBy === 'funding') {
          filteredProjects.sort((a, b) => 
            (b.raisedAmount / b.targetAmount) - (a.raisedAmount / a.targetAmount)
          );
        } else if (sortBy === 'endingSoon') {
          filteredProjects.sort((a, b) => a.daysLeft - b.daysLeft);
        }
        
        setProjects(filteredProjects);
        setIsLoading(false);
      }, 500);
    };
    
    fetchProjects();
  }, [searchQuery, categoryFilter, sortBy]);
  
  const categories = ['All', 'DeFi', 'Metaverse', 'GreenTech', 'Infrastructure', 'NFT', 'Gaming'];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 page-transition">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl font-bold text-gray-900 animate-fade-up">Discover Projects</h1>
              <p className="mt-4 text-xl text-gray-600 animate-fade-up animation-delay-100">
                Browse innovative startups raising funds through tokenized equity
              </p>
            </div>
            
            <div className="mb-8 animate-fade-up animation-delay-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Select 
                    value={categoryFilter} 
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        category !== 'All' && (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <ArrowDownUp className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="funding">Most Funded</SelectItem>
                      <SelectItem value="endingSoon">Ending Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isConnected && (
                  <div className="animate-fade-up">
                    <CreateProjectCard />
                  </div>
                )}
                
                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className={`animate-fade-up animation-delay-${(index % 3) * 100}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setSortBy('newest');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
