
import React, { useState, useEffect } from 'react';
import { Clock, Download, Share2, Eye } from 'lucide-react';
import { Disease } from '../data/diseaseDatabase';

interface AnalysisResult {
  id: string;
  timestamp: Date;
  image: string;
  disease: Disease;
  confidence: number;
}

const ResultsHistory = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('cropAnalysisResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults).map((result: any) => ({
        ...result,
        timestamp: new Date(result.timestamp)
      }));
      setResults(parsedResults);
    }
  }, []);

  const exportResults = () => {
    const csvContent = results.map(result => 
      `${result.timestamp.toISOString()},${result.disease.name},${result.confidence}%,${result.disease.severity}`
    ).join('\n');
    
    const blob = new Blob([`Date,Disease,Confidence,Severity\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crop-analysis-results.csv';
    a.click();
  };

  const shareResult = (result: AnalysisResult) => {
    if (navigator.share) {
      navigator.share({
        title: 'Crop Analysis Result',
        text: `Detected: ${result.disease.name} with ${result.confidence}% confidence`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Analysis History</h3>
        {results.length > 0 && (
          <button
            onClick={exportResults}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No analysis history yet</p>
          <p className="text-sm">Upload your first crop image to get started</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <img
                  src={result.image}
                  alt="Analyzed crop"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{result.disease.name}</h4>
                      <p className="text-sm text-gray-600">{result.confidence}% confidence</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => shareResult(result)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      result.disease.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      result.disease.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      result.disease.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {result.disease.severity}
                    </span>
                    <span className="text-xs text-gray-500">
                      {result.timestamp.toLocaleDateString()} {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsHistory;
