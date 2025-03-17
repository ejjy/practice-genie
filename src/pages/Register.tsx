
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [examPreference, setExamPreference] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: 'Terms and Privacy',
        description: 'Please agree to the Terms of Service and Privacy Policy',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            exam_preference: examPreference,
          },
        },
      });

      if (error) {
        throw error;
      }

      // Successfully registered
      toast({
        title: 'Account created!',
        description: 'Welcome to Practico. Your account has been created successfully.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred during registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Sign up to start your exam preparation journey
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exam-preference">Exam Preference</Label>
            <Select
              value={examPreference}
              onValueChange={setExamPreference}
            >
              <SelectTrigger id="exam-preference">
                <SelectValue placeholder="Select your target exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ssc-cgl">SSC CGL</SelectItem>
                <SelectItem value="upsc-cse">UPSC Civil Services</SelectItem>
                <SelectItem value="ibps-po">IBPS PO</SelectItem>
                <SelectItem value="cat">CAT</SelectItem>
                <SelectItem value="gate">GATE</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{' '}
              <Link to="/terms" className="text-practico-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-practico-600 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-practico-600 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
