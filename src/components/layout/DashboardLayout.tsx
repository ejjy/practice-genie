
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { Bell } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-r from-practico-100 to-practico-50 p-3 text-center text-sm text-practico-800">
          <span className="font-medium">Update:</span> New UPSC, SSC, and Banking exam questions added daily! Prepare for all major Indian competitive exams with Practico.
        </div>
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
