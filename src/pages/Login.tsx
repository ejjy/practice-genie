
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login for demo
    setTimeout(() => {
      setIsLoading(false);
      // For demo, we'll just redirect to dashboard with any credentials
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-practico-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="grid h-4 w-4 place-items-center rounded-sm border">
              <div className="h-2 w-2 rounded-sm bg-primary"></div>
            </div>
            <Label htmlFor="remember" className="text-sm">Remember me</Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-practico-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
