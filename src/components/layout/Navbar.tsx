
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Navbar = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link to="/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
