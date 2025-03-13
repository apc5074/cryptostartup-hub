
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-primary transition-colors duration-300"
          >
            <Wallet className="h-6 w-6" />
            <span className="hidden sm:inline">CryptoStartup</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Connect Wallet
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLinks mobile />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-around px-5">
              <Button variant="outline" className="w-full mr-2">Sign In</Button>
              <Button className="w-full ml-2">Connect Wallet</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const links = [
    { name: 'Home', to: '/' },
    { name: 'Projects', to: '/projects' },
    { name: 'How It Works', to: '/how-it-works' }
  ];
  
  const location = useLocation();
  
  if (mobile) {
    return (
      <>
        {links.map((link, index) => (
          <Link
            key={link.name}
            to={link.to}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === link.to
                ? 'text-primary font-semibold'
                : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
            } transition-all duration-200 animate-fade-up animation-delay-${index * 100}`}
          >
            {link.name}
          </Link>
        ))}
      </>
    );
  }
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.to}
          className={`px-1 py-2 text-sm font-medium ${
            location.pathname === link.to
              ? 'text-primary font-semibold'
              : 'text-gray-700 hover:text-primary'
          } transition-colors duration-200 relative group`}
        >
          {link.name}
          <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
            location.pathname === link.to ? 'w-full' : ''
          }`}></span>
        </Link>
      ))}
    </>
  );
};

export default Header;
