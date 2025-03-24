import { CheckCircle } from "lucide-react";

export default function WhatYouWillLearn() {
  const learningPoints = [
    "Understand the mathematical foundations of machine learning algorithms",
    "Build and train neural networks using PyTorch and TensorFlow",
    "Implement advanced computer vision and natural language processing models",
    "Deploy machine learning models to production environments",
    "Optimize model performance and handle large-scale datasets",
    "Apply reinforcement learning to solve complex problems",
    "Master feature engineering and data preprocessing techniques",
    "Develop a portfolio of real-world machine learning projects",
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">What You'll Learn</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {learningPoints.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}