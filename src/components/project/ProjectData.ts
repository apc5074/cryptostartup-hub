
import { Project } from "@/components/ProjectCard";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Milestone {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

// Mock data - this would come from an API in a real app
export const mockProjects: Record<string, Project> = {
  '1': {
    id: '1',
    name: "Decentralized Finance Platform",
    description: "Building the next generation of DeFi applications with cross-chain compatibility and advanced yield optimization strategies. Our platform enables seamless asset transfers and intelligent yield farming across multiple blockchains.\n\nOur mission is to make decentralized finance accessible to everyone while maintaining the highest standards of security and transparency. By leveraging the latest blockchain technologies, we're creating a platform that simplifies complex DeFi operations and maximizes returns for users without requiring deep technical knowledge.\n\nKey features include:\n- Cross-chain asset transfers\n- Automated yield optimization\n- Risk-adjusted portfolio management\n- Real-time analytics and performance tracking\n- Smart contract insurance protection",
    tagline: "Cross-chain DeFi platform with intelligent yield optimization",
    category: "DeFi",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000",
    targetAmount: 1500000,
    raisedAmount: 1275000,
    investors: 421,
    daysLeft: 15,
    tokenSymbol: "DFP",
    tokenPrice: 0.085,
    minInvestment: 100
  },
  '2': {
    id: '2',
    name: "AR Metaverse Ecosystem",
    description: "Creating an augmented reality metaverse that overlays digital experiences onto the physical world. Our ecosystem combines AR technology with blockchain to create persistent, ownable digital assets in real-world contexts.\n\nWe're building the infrastructure for the next generation of AR experiences, where digital content and real-world environments merge seamlessly. Users can create, own, and trade digital assets that exist within specific geographic locations or attached to physical objects.\n\nOur platform enables:\n- Location-based digital experiences and games\n- Real estate in the digital layer of the physical world\n- AR marketplaces for digital collectibles and art\n- Social interactions in mixed reality spaces\n- SDK for developers to create their own AR experiences",
    tagline: "Bridging digital and physical worlds through AR and blockchain",
    category: "Metaverse",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000",
    targetAmount: 2000000,
    raisedAmount: 1450000,
    investors: 326,
    daysLeft: 21,
    tokenSymbol: "ARME",
    tokenPrice: 0.125,
    minInvestment: 150
  },
  '3': {
    id: '3',
    name: "Carbon Credit Blockchain",
    description: "Revolutionizing the carbon credit market with blockchain verification and trading. Our platform ensures transparent tracking of carbon offsets and simplifies the process of buying, selling, and retiring carbon credits.\n\nWe're addressing one of the biggest challenges in the carbon market: verification and transparency. By recording carbon offsets on the blockchain, we create an immutable record of carbon credits from generation to retirement, eliminating double-counting and fraud.\n\nOur system includes:\n- Blockchain-based carbon credit registry\n- Automated verification using IoT and satellite data\n- Fractional ownership of carbon credits\n- Simplified marketplace for businesses and individuals\n- Impact tracking and reporting tools",
    tagline: "Transparent carbon credit verification and trading platform",
    category: "GreenTech",
    imageUrl: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1000",
    targetAmount: 1000000,
    raisedAmount: 820000,
    investors: 254,
    daysLeft: 12,
    tokenSymbol: "CCT",
    tokenPrice: 0.045,
    minInvestment: 75
  }
};

// Mock additional data
export const teamMembers: Record<string, TeamMember[]> = {
  '1': [
    {
      name: "Alexandra Chen",
      role: "CEO & Co-Founder",
      bio: "Former investment banker with 8 years experience in fintech. Led multiple successful DeFi projects.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Blockchain developer since 2015. Contributed to Ethereum and multiple Layer 2 solutions.",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Head of Product",
      bio: "Product leader with experience at major fintech companies. Expert in user-centric financial products.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ],
  '2': [
    {
      name: "David Kim",
      role: "CEO & Founder",
      bio: "AR/VR pioneer with 10+ years experience. Previously led AR initiatives at a major tech company.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Rebecca Williams",
      role: "CTO",
      bio: "Computer vision PhD with expertise in spatial computing and blockchain technology.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      name: "James Taylor",
      role: "Creative Director",
      bio: "Award-winning designer specializing in immersive experiences. Former game studio art director.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ],
  '3': [
    {
      name: "Emma Wilson",
      role: "CEO & Co-Founder",
      bio: "Environmental scientist with 12 years experience in carbon markets and climate policy.",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      name: "Daniel Martinez",
      role: "CTO & Co-Founder",
      bio: "Blockchain architect specializing in sustainability applications and environmental impact tracking.",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    {
      name: "Olivia Chang",
      role: "Head of Partnerships",
      bio: "Former sustainability consultant who has worked with Fortune 500 companies on carbon neutrality initiatives.",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg"
    }
  ]
};

export const milestones: Record<string, Milestone[]> = {
  '1': [
    {
      title: "Concept Development",
      description: "Initial platform design and technical architecture",
      date: "Q1 2023",
      completed: true
    },
    {
      title: "Alpha Launch",
      description: "Private alpha release with core functionality",
      date: "Q3 2023",
      completed: true
    },
    {
      title: "Beta Testing",
      description: "Public beta with integrated multi-chain support",
      date: "Q1 2024",
      completed: false
    },
    {
      title: "Full Platform Launch",
      description: "Complete platform with all planned features",
      date: "Q3 2024",
      completed: false
    }
  ],
  '2': [
    {
      title: "Prototype Development",
      description: "Initial AR technology prototype and blockchain integration",
      date: "Q2 2023",
      completed: true
    },
    {
      title: "Developer SDK Alpha",
      description: "First version of developer tools and documentation",
      date: "Q4 2023",
      completed: true
    },
    {
      title: "Public Beta",
      description: "Limited geographic rollout with core features",
      date: "Q2 2024",
      completed: false
    },
    {
      title: "Global Launch",
      description: "Worldwide release with full feature set",
      date: "Q4 2024",
      completed: false
    }
  ],
  '3': [
    {
      title: "Platform Development",
      description: "Core registry and marketplace development",
      date: "Q3 2023",
      completed: true
    },
    {
      title: "Verification System",
      description: "Implementation of multi-source verification system",
      date: "Q4 2023",
      completed: true
    },
    {
      title: "Corporate Partnerships",
      description: "Onboarding initial corporate users and offset providers",
      date: "Q2 2024",
      completed: false
    },
    {
      title: "Global Scaling",
      description: "Expansion to international carbon markets",
      date: "Q4 2024",
      completed: false
    }
  ]
};
