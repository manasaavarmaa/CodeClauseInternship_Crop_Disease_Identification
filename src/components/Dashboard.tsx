
import React from 'react';
import Analytics from './Analytics';

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your crop health analysis results and identify patterns in your farming data
          </p>
        </div>

        <Analytics />
      </div>
    </section>
  );
};

export default Dashboard;
