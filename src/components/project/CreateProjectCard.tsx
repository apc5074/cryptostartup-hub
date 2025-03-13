
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateProjectCard = () => {
  return (
    <Link
      to="/create-project"
      className="flex flex-col items-center justify-center h-full min-h-[300px] rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center hover:border-primary hover:bg-gray-50 transition-all duration-300"
    >
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <Plus className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Project</h3>
      <p className="text-sm text-gray-500">Launch your blockchain project and raise funds</p>
    </Link>
  );
};

export default CreateProjectCard;
