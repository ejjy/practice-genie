
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Award, 
  BarChart3, 
  HelpCircle, 
  Settings, 
  LogOut 
} from 'lucide-react';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Practice Tests', icon: BookOpen, path: '/tests' },
    { name: 'Mock Exams', icon: Award, path: '/mock-exams' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Ask Doubts', icon: HelpCircle, path: '/doubts' },
  ];
  
  const bottomNavItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link
        to={item.path}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          isActive 
            ? "bg-practico-100 text-practico-700 font-medium" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Logo size="sm" />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
      </div>
      <div className="mt-auto p-2">
        <nav className="grid items-start px-2 gap-1">
          {bottomNavItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
