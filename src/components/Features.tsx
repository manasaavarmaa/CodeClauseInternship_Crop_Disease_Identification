
import React from 'react';
import { Camera, Search, Check } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Instant Image Analysis",
      description: "Upload crop images and get disease detection results in seconds using advanced CNN models",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Search,
      title: "Disease Identification",
      description: "Accurate identification of common crop diseases including blight, rust, mildew, and more",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Check,
      title: "Treatment Recommendations",
      description: "Get personalized treatment suggestions and preventive measures for detected diseases",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Modern Farming
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to protect your crops and maximize your harvest yield
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
