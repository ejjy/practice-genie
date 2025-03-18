
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
