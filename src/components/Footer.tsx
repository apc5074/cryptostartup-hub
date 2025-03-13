
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-2 text-lg font-bold text-primary">
              <span>CryptoStartup</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              A transparent, secure platform connecting innovative startups with cryptocurrency investors, 
              revolutionizing the way early-stage ventures are funded.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/projects" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  For Startups
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  For Investors
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors duration-200">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {currentYear} CryptoStartup. All rights reserved. Made with <Heart className="inline-block h-4 w-4 text-red-500" /> for innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
