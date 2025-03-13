
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Sparkles, Shield, LineChart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedProjects from "@/components/FeaturedProjects";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 sm:pt-24 lg:pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Invest in the Future of <span className="text-primary">Innovation</span>
              </h1>
              
              <p className={`mt-6 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Connect with groundbreaking startups and invest in their future using cryptocurrency. 
                A transparent, secure platform for the next generation of venture capital.
              </p>
              
              <div className={`mt-10 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Link to="/projects">
                  <Button size="lg" className="group">
                    Browse Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className={`mt-16 max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200" 
                alt="Platform Dashboard" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Scroll Down Indicator */}
            <div className="flex justify-center mt-12 sm:mt-16 animate-bounce">
              <ArrowDown className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 animate-fade-up">Why Choose CryptoStartup</h2>
              <p className="mt-4 text-xl text-gray-600 animate-fade-up animation-delay-100">
                A revolutionary platform combining traditional venture capital with the transparency and accessibility of blockchain.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-up animation-delay-200">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Startups</h3>
                <p className="text-gray-600">
                  Every project is thoroughly vetted by our team of experts before being listed on the platform.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-up animation-delay-300">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Investments</h3>
                <p className="text-gray-600">
                  Blockchain-based investments with smart contracts ensure transparency and security for all transactions.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-up animation-delay-400">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Portfolio Tracking</h3>
                <p className="text-gray-600">
                  Monitor your investments in real-time and stay updated on the progress of your startup portfolio.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects */}
        <FeaturedProjects />
        
        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")'
            }}
          />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white animate-fade-up">Ready to Start Investing?</h2>
              <p className="mt-4 text-xl text-blue-100 animate-fade-up animation-delay-100">
                Join thousands of investors funding the next generation of innovative startups.
              </p>
              
              <div className="mt-10 animate-fade-up animation-delay-200">
                <Link to="/projects">
                  <Button size="lg" variant="secondary" className="group">
                    Explore Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
