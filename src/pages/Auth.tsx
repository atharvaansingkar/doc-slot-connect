
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAppointment } from '@/context/AppointmentContext';
import { signIn, signUp, getCurrentUser } from '@/services/auth';
import { UserIcon, UserCog } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentUser } = useAppointment();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sign-in');

  useEffect(() => {
    // Check if user is already logged in
    const checkCurrentUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
        navigate(user.type === 'doctor' ? '/doctor' : '/user');
      }
    };
    
    checkCurrentUser();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await signIn(email, password);
      if (user) {
        setCurrentUser(user);
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
        navigate(user.type === 'doctor' ? '/doctor' : '/user');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, userType, name);
      toast({
        title: "Success",
        description: "Account created successfully. Please sign in.",
      });
      setActiveTab('sign-in');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container">
          <h1 className="text-3xl font-bold text-center text-medical-700">
            Doc<span className="text-medical-500">Connect</span>
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Schedule appointments with healthcare professionals
          </p>
        </div>
      </header>
      
      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sign-in">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignIn}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="sign-up">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>
                    Enter your details to create a new account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
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
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <Button 
                          type="button"
                          variant={userType === 'patient' ? "default" : "outline"}
                          className="flex flex-col items-center justify-center p-4 h-auto"
                          onClick={() => setUserType('patient')}
                        >
                          <UserIcon className="h-6 w-6 mb-2" />
                          <span>Patient</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={userType === 'doctor' ? "default" : "outline"}
                          className="flex flex-col items-center justify-center p-4 h-auto"
                          onClick={() => setUserType('doctor')}
                        >
                          <UserCog className="h-6 w-6 mb-2" />
                          <span>Doctor</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DocConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Auth;
