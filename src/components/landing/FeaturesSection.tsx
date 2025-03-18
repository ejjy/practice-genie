
import React from 'react';
import { BookOpen, Trophy, GitBranch, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'AI-Powered Practice',
      description: 'Personalized daily tests that adapt to your performance and focus on your weak areas.'
    },
    {
      icon: Trophy,
      title: 'Mock Exams',
      description: 'Full-length mock tests with real-time rankings and detailed performance analytics.'
    },
    {
      icon: GitBranch,
      title: 'Learning Paths',
      description: 'Structured study journeys designed by experts for different competitive exams.'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with peers, share study resources, and participate in group discussions.'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose <span className="practico-gradient-text">Practico</span>?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with proven study methods to help you achieve your goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
