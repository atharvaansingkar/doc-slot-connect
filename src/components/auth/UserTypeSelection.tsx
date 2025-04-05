
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, UserCog } from 'lucide-react';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: 'doctor' | 'patient') => {
    // Navigate to the auth page
    navigate('/auth');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-medical-700">Doctor</CardTitle>
          <CardDescription>Login as a healthcare provider</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <UserCog className="h-24 w-24 text-medical-500" />
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button 
            className="w-full max-w-xs"
            onClick={() => handleUserTypeSelect('doctor')}
          >
            Continue as Doctor
          </Button>
        </CardFooter>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-medical-700">Patient</CardTitle>
          <CardDescription>Login as a patient</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <UserIcon className="h-24 w-24 text-medical-500" />
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button 
            className="w-full max-w-xs"
            onClick={() => handleUserTypeSelect('patient')}
          >
            Continue as Patient
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserTypeSelection;
