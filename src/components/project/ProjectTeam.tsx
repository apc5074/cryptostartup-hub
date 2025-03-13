
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface ProjectTeamProps {
  teamData: TeamMember[];
}

const ProjectTeam = ({ teamData }: ProjectTeamProps) => {
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};

export default ProjectTeam;
