
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Trophy, Users, BookOpen, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Logo from '@/components/Logo';

const Index = () => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Brand Showcase */}
            <div className="text-center mb-16">
              <Logo size="lg" className="mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                The Smart Way to Prepare for Competitive Exams
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="practico-gradient-text">AI-Powered</span> Exam Preparation
                </h1>
                <p className="text-xl text-muted-foreground">
                  Personalized practice tests, AI-driven insights, and performance tracking for competitive exams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/features">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-practico-100 border border-white flex items-center justify-center font-medium text-practico-700">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-foreground font-medium">1000+</span> students joined this week
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-2xl practico-gradient p-1">
                  <div className="bg-white rounded-xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Today's Practice Test</h3>
                      <Logo size="sm" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground mb-2">SSC CGL - Quantitative Aptitude</div>
                        <div className="font-medium">If a man covers a certain distance in 24 minutes at the speed of 10 km/hr, then the time taken to cover the same distance at the speed of 40 km/hr is:</div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="border rounded p-2 text-sm">6 minutes</div>
                          <div className="border rounded p-2 text-sm">8 minutes</div>
                          <div className="border rounded p-2 text-sm practico-gradient text-white">
                            <div className="flex justify-between items-center">
                              <span>6 minutes</span>
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="border rounded p-2 text-sm">12 minutes</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-muted-foreground">Question 3 of 10</div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-practico-600"></div>
                          <div className="h-2 w-2 rounded-full bg-practico-600"></div>
                          <div className="h-2 w-2 rounded-full bg-practico-600 animate-pulse-soft"></div>
                          <div className="h-2 w-2 rounded-full bg-muted"></div>
                          <div className="h-2 w-2 rounded-full bg-muted"></div>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">
                            Next
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -z-10 -top-6 -left-6 h-full w-full rounded-2xl bg-muted"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
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
                <div key={feature.title} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="practico-gradient h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-2xl practico-gradient text-white p-10 md:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to ace your competitive exams with <span className="underline decoration-4 decoration-white/50">Practico</span>?
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  Join thousands of students who have improved their scores with Practico's personalized practice platform.
                </p>
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-practico-600 hover:bg-practico-50">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Practico. All rights reserved.
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
