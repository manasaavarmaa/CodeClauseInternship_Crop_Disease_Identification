
export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  prevention: string[];
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  cropTypes: string[];
  imageUrl?: string;
}

export const diseaseDatabase: Disease[] = [
  {
    id: 'healthy',
    name: 'Healthy Plant',
    scientificName: 'No disease detected',
    description: 'The plant appears healthy with no visible signs of disease or stress.',
    symptoms: ['Green, vibrant leaves', 'Normal growth pattern', 'No discoloration'],
    causes: ['Proper care', 'Good growing conditions', 'Adequate nutrition'],
    treatments: ['Continue current care routine', 'Regular monitoring'],
    prevention: ['Maintain good practices', 'Regular inspection', 'Proper watering'],
    severity: 'Low',
    cropTypes: ['All crops']
  },
  {
    id: 'leaf_blight',
    name: 'Leaf Blight',
    scientificName: 'Alternaria spp.',
    description: 'A fungal disease causing dark spots and lesions on leaves, leading to yellowing and eventual leaf death.',
    symptoms: ['Dark brown spots on leaves', 'Yellow halos around spots', 'Leaf wilting', 'Premature leaf drop'],
    causes: ['High humidity', 'Poor air circulation', 'Overhead watering', 'Infected plant debris'],
    treatments: [
      'Apply copper-based fungicide every 7-10 days',
      'Remove affected leaves immediately',
      'Improve air circulation around plants',
      'Use drip irrigation instead of overhead watering'
    ],
    prevention: [
      'Plant disease-resistant varieties',
      'Ensure proper spacing between plants',
      'Water at soil level',
      'Remove plant debris regularly'
    ],
    severity: 'Moderate',
    cropTypes: ['Tomato', 'Potato', 'Corn', 'Wheat']
  },
  {
    id: 'rust_disease',
    name: 'Rust Disease',
    scientificName: 'Puccinia spp.',
    description: 'A fungal disease characterized by orange, yellow, or brown pustules on leaf surfaces.',
    symptoms: ['Orange/brown pustules on leaves', 'Yellow spots on upper leaf surface', 'Stunted growth', 'Reduced yield'],
    causes: ['Cool, moist conditions', 'Dense plant canopy', 'Wind-dispersed spores', 'Susceptible varieties'],
    treatments: [
      'Apply systemic fungicide (triazole-based)',
      'Remove severely affected leaves',
      'Increase plant spacing',
      'Apply sulfur-based fungicide for organic treatment'
    ],
    prevention: [
      'Choose rust-resistant varieties',
      'Avoid overhead irrigation',
      'Provide adequate plant spacing',
      'Monitor weather conditions'
    ],
    severity: 'High',
    cropTypes: ['Wheat', 'Corn', 'Bean', 'Coffee']
  },
  {
    id: 'powdery_mildew',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphe cichoracearum',
    description: 'A fungal disease that appears as white, powdery growth on leaf surfaces and stems.',
    symptoms: ['White powdery coating on leaves', 'Yellowing leaves', 'Stunted growth', 'Distorted plant parts'],
    causes: ['High humidity with dry conditions', 'Poor air circulation', 'Overcrowded plants', 'Moderate temperatures'],
    treatments: [
      'Apply potassium bicarbonate spray',
      'Use neem oil treatment',
      'Improve air circulation',
      'Apply sulfur-based fungicide'
    ],
    prevention: [
      'Ensure good air circulation',
      'Avoid overcrowding plants',
      'Water at soil level',
      'Choose resistant varieties'
    ],
    severity: 'Moderate',
    cropTypes: ['Cucumber', 'Zucchini', 'Pumpkin', 'Grape']
  },
  {
    id: 'bacterial_spot',
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas spp.',
    description: 'A bacterial disease causing small, dark spots on leaves, stems, and fruits.',
    symptoms: ['Small dark spots with yellow halos', 'Leaf yellowing and drop', 'Fruit lesions', 'Defoliation'],
    causes: ['Warm, humid weather', 'Overhead watering', 'Contaminated seeds', 'Infected plant debris'],
    treatments: [
      'Apply copper-based bactericide',
      'Remove affected plant parts',
      'Improve drainage',
      'Use certified disease-free seeds'
    ],
    prevention: [
      'Use drip irrigation',
      'Rotate crops annually',
      'Disinfect tools between plants',
      'Choose resistant varieties'
    ],
    severity: 'High',
    cropTypes: ['Tomato', 'Pepper', 'Bean', 'Cucumber']
  },
  {
    id: 'mosaic_virus',
    name: 'Mosaic Virus',
    scientificName: 'Tobacco mosaic virus (TMV)',
    description: 'A viral disease causing mottled, mosaic-like patterns on leaves with stunted growth.',
    symptoms: ['Mottled yellow-green patterns', 'Stunted growth', 'Distorted leaves', 'Reduced fruit quality'],
    causes: ['Infected seeds', 'Contaminated tools', 'Aphid transmission', 'Contact with infected plants'],
    treatments: [
      'Remove infected plants immediately',
      'Control aphid populations',
      'Disinfect tools with bleach solution',
      'No chemical cure available'
    ],
    prevention: [
      'Use virus-free seeds',
      'Control insect vectors',
      'Avoid handling wet plants',
      'Practice crop rotation'
    ],
    severity: 'Critical',
    cropTypes: ['Tomato', 'Tobacco', 'Pepper', 'Cucumber']
  }
];

export const getRandomDisease = (): Disease => {
  const randomIndex = Math.floor(Math.random() * diseaseDatabase.length);
  return diseaseDatabase[randomIndex];
};

export const getDiseaseById = (id: string): Disease | undefined => {
  return diseaseDatabase.find(disease => disease.id === id);
};
