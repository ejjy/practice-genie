
import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '@/components/Logo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col practico-gradient p-10 text-white">
        <div className="flex items-center gap-2">
          <Logo textVisible={true} className="text-white" />
        </div>
        <div className="mt-auto space-y-4">
          <h1 className="text-3xl font-bold">Prepare Smarter, Not Harder</h1>
          <p className="text-lg opacity-90">
            AI-driven practice tests and personalized insights to help you excel in competitive exams.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-sm opacity-90">Daily Active Users</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm opacity-90">Practice Questions</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">20+</div>
              <div className="text-sm opacity-90">Supported Exams</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
