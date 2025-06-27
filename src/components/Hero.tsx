
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Protect Your Crops with
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent block">
              AI-Powered Detection
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload images of your crops and get instant disease identification with treatment recommendations. 
            Powered by advanced deep learning technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Analysis
            </button>
            <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-green-500 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
