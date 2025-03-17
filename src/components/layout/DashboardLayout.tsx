
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
