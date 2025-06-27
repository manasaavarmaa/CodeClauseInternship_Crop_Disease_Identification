
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import Features from '../components/Features';
import Dashboard from '../components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      <Hero />
      <UploadSection />
      <Features />
      <Dashboard />
    </div>
  );
};

export default Index;
