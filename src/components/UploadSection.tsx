
import React, { useState, useRef } from 'react';
import { Upload, Camera, Image, Check, X, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from './CameraCapture';
import DiseaseDetails from './DiseaseDetails';
import ResultsHistory from './ResultsHistory';
import { getRandomDisease, Disease } from '../data/diseaseDatabase';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ disease: Disease; confidence: number } | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const analyzeImage = (imageData: string) => {
    setAnalyzing(true);
    setResult(null);
    
    // Enhanced AI analysis simulation
    setTimeout(() => {
      const disease = getRandomDisease();
      const confidence = Math.floor(Math.random() * 13) + 85; // 85-97%
      
      const newResult = { disease, confidence };
      setResult(newResult);
      setAnalyzing(false);
      
      // Save to history
      const analysisResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        image: imageData,
        disease,
        confidence
      };
      
      const savedResults = JSON.parse(localStorage.getItem('cropAnalysisResults') || '[]');
      savedResults.unshift(analysisResult);
      localStorage.setItem('cropAnalysisResults', JSON.stringify(savedResults.slice(0, 50))); // Keep last 50
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${disease.name} (${confidence}% confidence)`,
      });
    }, 3000);
  };

  const handleCameraCapture = (imageData: string) => {
    setUploadedImage(imageData);
    setShowCamera(false);
    analyzeImage(imageData);
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="upload" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Upload Your Crop Image
          </h2>
          <p className="text-lg text-gray-600">
            Drag and drop or click to upload an image of your crop for instant disease analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <div className="space-y-6">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
                
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded crop"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setResult(null);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        Drop your image here
                      </p>
                      <p className="text-gray-600 mb-4">
                        or click to browse files
                      </p>
                      <button
                        onClick={handleFileInput}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        Select Image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Image className="h-5 w-5" />
                  Gallery
                </button>
                <button 
                  onClick={() => setShowCamera(true)}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  Camera
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Analysis Results</h3>
                {result && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" />
                    Details
                  </button>
                )}
              </div>
              
              {analyzing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Analyzing your crop image...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-500">Processing with AI models...</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {result.disease.name === "Healthy Plant" ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-800">{result.disease.name}</h4>
                      <p className="text-sm text-gray-600">{result.confidence}% confidence</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Severity</span>
                      <span className={`text-sm font-semibold ${
                        result.disease.severity === 'Critical' ? 'text-red-600' :
                        result.disease.severity === 'High' ? 'text-red-600' :
                        result.disease.severity === 'Moderate' ? 'text-yellow-600' :
                        result.disease.severity === 'Low' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {result.disease.severity}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Recommended Treatment:</p>
                      <p className="text-sm text-gray-600">{result.disease.treatments[0]}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Upload an image to see analysis results</p>
                </div>
              )}
            </div>
          </div>

          {/* Results History */}
          <div>
            <ResultsHistory />
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Disease Details Modal */}
      {showDetails && result && (
        <DiseaseDetails
          disease={result.disease}
          confidence={result.confidence}
          onClose={() => setShowDetails(false)}
        />
      )}
    </section>
  );
};

export default UploadSection;
