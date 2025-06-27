
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalScans: 0,
    healthyPlants: 0,
    diseasedPlants: 0,
    severityBreakdown: [] as any[],
    recentTrends: [] as any[]
  });

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('cropAnalysisResults') || '[]');
    
    const totalScans = savedResults.length;
    const healthyPlants = savedResults.filter((r: any) => r.disease.name === 'Healthy Plant').length;
    const diseasedPlants = totalScans - healthyPlants;
    
    const severityCount = savedResults.reduce((acc: any, result: any) => {
      acc[result.disease.severity] = (acc[result.disease.severity] || 0) + 1;
      return acc;
    }, {});
    
    const severityBreakdown = Object.entries(severityCount).map(([severity, count]) => ({
      name: severity,
      value: count as number,
      color: severity === 'Critical' ? '#ef4444' : 
             severity === 'High' ? '#f97316' :
             severity === 'Moderate' ? '#eab308' : '#22c55e'
    }));

    // Generate trend data for last 7 days
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const recentTrends = last7Days.map(date => {
      const dayResults = savedResults.filter((r: any) => 
        new Date(r.timestamp).toISOString().split('T')[0] === date
      );
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        scans: dayResults.length,
        healthy: dayResults.filter((r: any) => r.disease.name === 'Healthy Plant').length,
        diseased: dayResults.filter((r: any) => r.disease.name !== 'Healthy Plant').length
      };
    });

    setAnalyticsData({
      totalScans,
      healthyPlants,
      diseasedPlants,
      severityBreakdown,
      recentTrends
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Scans</p>
              <p className="text-2xl font-bold text-blue-800">{analyticsData.totalScans}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Healthy Plants</p>
              <p className="text-2xl font-bold text-green-800">{analyticsData.healthyPlants}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-red-600 font-medium">Issues Detected</p>
              <p className="text-2xl font-bold text-red-800">{analyticsData.diseasedPlants}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.recentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="healthy" stackId="a" fill="#22c55e" name="Healthy" />
              <Bar dataKey="diseased" stackId="a" fill="#ef4444" name="Diseased" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Disease Severity</h3>
          {analyticsData.severityBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.severityBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.severityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
