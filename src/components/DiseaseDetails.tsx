
import React from 'react';
import { X, AlertTriangle, Shield, Zap, Info } from 'lucide-react';
import { Disease } from '../data/diseaseDatabase';

interface DiseaseDetailsProps {
  disease: Disease;
  confidence: number;
  onClose: () => void;
}

const DiseaseDetails = ({ disease, confidence, onClose }: DiseaseDetailsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{disease.name}</h2>
              <p className="text-sm text-gray-600 italic">{disease.scientificName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(disease.severity)}`}>
              {disease.severity} Severity
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {confidence}% Confidence
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-gray-700 leading-relaxed">{disease.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Symptoms</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {disease.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">Causes</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {disease.causes.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">Treatment</h3>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {disease.treatments.map((treatment, index) => (
                  <li key={index} className="font-medium">{treatment}</li>
                ))}
              </ol>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Prevention</h3>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {disease.prevention.map((prevention, index) => (
                  <li key={index}>{prevention}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Affected Crops</h3>
            <div className="flex flex-wrap gap-2">
              {disease.cropTypes.map((crop, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetails;
