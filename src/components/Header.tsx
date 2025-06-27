
import React from 'react';
import { Leaf, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">CropGuard AI</h1>
              <p className="text-sm text-green-600">Smart Disease Detection</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#upload" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Analyze Crop
            </a>
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Features
            </a>
            <a href="#dashboard" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Dashboard
            </a>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </nav>
          <button className="md:hidden p-2 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
