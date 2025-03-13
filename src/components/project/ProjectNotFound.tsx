
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectNotFound = () => {
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
};

export default ProjectNotFound;
