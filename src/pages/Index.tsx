
import React from 'react';
import UserTypeSelection from '@/components/auth/UserTypeSelection';

const Index = () => {
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
      
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Welcome to DocConnect</h2>
          <p className="text-xl text-muted-foreground">
            Seamlessly connect with healthcare providers for in-person or virtual appointments
          </p>
        </div>
        
        <div className="mt-10">
          <UserTypeSelection />
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

export default Index;
