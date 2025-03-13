
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Wallet, Clock, Users, Award, ChevronLeft, Share2, BookmarkPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestmentModal from "@/components/InvestmentModal";
import { Project } from "@/components/ProjectCard";
import { useToast } from "@/components/ui/use-toast";

// Mock data - this would come from an API in a real app
const mockProjects: Record<string, Project> = {
  '1': {
    id: '1',
    name: 'Decentralized Finance Platform',
    description: "Building the next generation of DeFi applications with cross-chain compatibility and advanced yield optimization strategies. Our platform enables seamless asset transfers and intelligent yield farming across multiple blockchains.\n\nOur mission is to make decentralized finance accessible to everyone while maintaining the highest standards of security and transparency. By leveraging the latest blockchain technologies, we're creating a platform that simplifies complex DeFi operations and maximizes returns for users without requiring deep technical knowledge.\n\nKey features include:\n- Cross-chain asset transfers\n- Automated yield optimization\n- Risk-adjusted portfolio management\n- Real-time analytics and performance tracking\n- Smart contract insurance protection",
    tagline: 'Cross-chain DeFi platform with intelligent yield optimization',
    category: 'DeFi',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000',
    targetAmount: 1500000,
    raisedAmount: 1275000,
    investors: 421,
    daysLeft: 15,
    tokenSymbol: 'DFP',
    tokenPrice: 0.085,
    minInvestment: 100
  },
  '2': {
    id: '2',
    name: 'AR Metaverse Ecosystem',
    description: "Creating an augmented reality metaverse that overlays digital experiences onto the physical world. Our ecosystem combines AR technology with blockchain to create persistent, ownable digital assets in real-world contexts.\n\nWe're building the infrastructure for the next generation of AR experiences, where digital content and real-world environments merge seamlessly. Users can create, own, and trade digital assets that exist within specific geographic locations or attached to physical objects.\n\nOur platform enables:\n- Location-based digital experiences and games\n- Real estate in the digital layer of the physical world\n- AR marketplaces for digital collectibles and art\n- Social interactions in mixed reality spaces\n- SDK for developers to create their own AR experiences",
    tagline: 'Bridging digital and physical worlds through AR and blockchain',
    category: 'Metaverse',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000',
    targetAmount: 2000000,
    raisedAmount: 1450000,
    investors: 326,
    daysLeft: 21,
    tokenSymbol: 'ARME',
    tokenPrice: 0.125,
    minInvestment: 150
  },
  '3': {
    id: '3',
    name: 'Carbon Credit Blockchain',
    description: "Revolutionizing the carbon credit market with blockchain verification and trading. Our platform ensures transparent tracking of carbon offsets and simplifies the process of buying, selling, and retiring carbon credits.\n\nWe're addressing one of the biggest challenges in the carbon market: verification and transparency. By recording carbon offsets on the blockchain, we create an immutable record of carbon credits from generation to retirement, eliminating double-counting and fraud.\n\nOur system includes:\n- Blockchain-based carbon credit registry\n- Automated verification using IoT and satellite data\n- Fractional ownership of carbon credits\n- Simplified marketplace for businesses and individuals\n- Impact tracking and reporting tools",
    tagline: 'Transparent carbon credit verification and trading platform',
    category: 'GreenTech',
    imageUrl: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1000',
    targetAmount: 1000000,
    raisedAmount: 820000,
    investors: 254,
    daysLeft: 12,
    tokenSymbol: 'CCT',
    tokenPrice: 0.045,
    minInvestment: 75
  }
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface Milestone {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

// Mock additional data
const teamMembers: Record<string, TeamMember[]> = {
  '1': [
    {
      name: 'Alexandra Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former investment banker with 8 years experience in fintech. Led multiple successful DeFi projects.',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Blockchain developer since 2015. Contributed to Ethereum and multiple Layer 2 solutions.',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Product',
      bio: 'Product leader with experience at major fintech companies. Expert in user-centric financial products.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ],
  '2': [
    {
      name: 'David Kim',
      role: 'CEO & Founder',
      bio: 'AR/VR pioneer with 10+ years experience. Previously led AR initiatives at a major tech company.',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      name: 'Rebecca Williams',
      role: 'CTO',
      bio: 'Computer vision PhD with expertise in spatial computing and blockchain technology.',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      name: 'James Taylor',
      role: 'Creative Director',
      bio: 'Award-winning designer specializing in immersive experiences. Former game studio art director.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ],
  '3': [
    {
      name: 'Emma Wilson',
      role: 'CEO & Co-Founder',
      bio: 'Environmental scientist with 12 years experience in carbon markets and climate policy.',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    {
      name: 'Daniel Martinez',
      role: 'CTO & Co-Founder',
      bio: 'Blockchain architect specializing in sustainability applications and environmental impact tracking.',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
    },
    {
      name: 'Olivia Chang',
      role: 'Head of Partnerships',
      bio: 'Former sustainability consultant who has worked with Fortune 500 companies on carbon neutrality initiatives.',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
    }
  ]
};

const milestones: Record<string, Milestone[]> = {
  '1': [
    {
      title: 'Concept Development',
      description: 'Initial platform design and technical architecture',
      date: 'Q1 2023',
      completed: true
    },
    {
      title: 'Alpha Launch',
      description: 'Private alpha release with core functionality',
      date: 'Q3 2023',
      completed: true
    },
    {
      title: 'Beta Testing',
      description: 'Public beta with integrated multi-chain support',
      date: 'Q1 2024',
      completed: false
    },
    {
      title: 'Full Platform Launch',
      description: 'Complete platform with all planned features',
      date: 'Q3 2024',
      completed: false
    }
  ],
  '2': [
    {
      title: 'Prototype Development',
      description: 'Initial AR technology prototype and blockchain integration',
      date: 'Q2 2023',
      completed: true
    },
    {
      title: 'Developer SDK Alpha',
      description: 'First version of developer tools and documentation',
      date: 'Q4 2023',
      completed: true
    },
    {
      title: 'Public Beta',
      description: 'Limited geographic rollout with core features',
      date: 'Q2 2024',
      completed: false
    },
    {
      title: 'Global Launch',
      description: 'Worldwide release with full feature set',
      date: 'Q4 2024',
      completed: false
    }
  ],
  '3': [
    {
      title: 'Platform Development',
      description: 'Core registry and marketplace development',
      date: 'Q3 2023',
      completed: true
    },
    {
      title: 'Verification System',
      description: 'Implementation of multi-source verification system',
      date: 'Q4 2023',
      completed: true
    },
    {
      title: 'Corporate Partnerships',
      description: 'Onboarding initial corporate users and offset providers',
      date: 'Q2 2024',
      completed: false
    },
    {
      title: 'Global Scaling',
      description: 'Expansion to international carbon markets',
      date: 'Q4 2024',
      completed: false
    }
  ]
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [milestoneData, setMilestoneData] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API fetch
    const fetchProjectDetails = () => {
      setIsLoading(true);
      setTimeout(() => {
        if (id && mockProjects[id]) {
          setProject(mockProjects[id]);
          setTeamData(teamMembers[id] || []);
          setMilestoneData(milestones[id] || []);
        }
        setIsLoading(false);
      }, 600);
    };
    
    fetchProjectDetails();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/projects">
              <Button>Browse All Projects</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const percentFunded = Math.min(Math.round((project.raisedAmount / project.targetAmount) * 100), 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-transition">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Info - Left Column */}
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
              
              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 animate-fade-in">
                  <div className="prose max-w-none">
                    {project.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="team" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamData.map((member, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover-lift">
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900">{member.name}</h3>
                          <p className="text-primary text-sm mb-2">{member.role}</p>
                          <p className="text-gray-600 text-sm">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="roadmap" className="animate-fade-in">
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
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Investment Info - Right Column */}
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
                      onClick={() => setInvestModalOpen(true)}
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
