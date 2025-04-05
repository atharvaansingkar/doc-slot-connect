
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAppointment } from '@/context/AppointmentContext';
import SlotCreator from '@/components/slots/SlotCreator';
import SlotsList from '@/components/slots/SlotsList';
import AppointmentCard from '@/components/appointments/AppointmentCard';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, availableSlots, appointments, setCurrentUser } = useAppointment();
  
  useEffect(() => {
    // Redirect if not a doctor
    if (!currentUser || currentUser.type !== 'doctor') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  if (!currentUser) return null;

  const mySlots = availableSlots.filter(slot => slot.doctorId === currentUser.id);
  const myAvailableSlots = mySlots.filter(slot => !slot.isBooked);
  const myBookedSlots = mySlots.filter(slot => slot.isBooked);
  
  const getAppointmentsForDoctor = () => {
    return appointments.filter(appointment => appointment.doctorId === currentUser.id);
  };

  const pendingAppointments = getAppointmentsForDoctor().filter(appointment => appointment.status === 'pending');
  const upcomingAppointments = getAppointmentsForDoctor().filter(appointment => appointment.status === 'approved');
  const pastAppointments = getAppointmentsForDoctor().filter(appointment => ['completed', 'cancelled'].includes(appointment.status));

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 border-b bg-medical-50">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold text-medical-700">
            Doc<span className="text-medical-500">Connect</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Dr. {currentUser.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-8">
        <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
        
        <Tabs defaultValue="slots" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="slots">My Availability</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="slots" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SlotCreator />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <SlotsList title="Available Slots" slots={myAvailableSlots} />
                <SlotsList title="Booked Slots" slots={myBookedSlots} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-8">
            {pendingAppointments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Pending Appointments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingAppointments.map(appointment => {
                    const slot = availableSlots.find(s => s.id === appointment.slotId);
                    if (!slot) return null;
                    return (
                      <AppointmentCard 
                        key={appointment.id} 
                        appointment={appointment} 
                        slot={slot}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {upcomingAppointments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Upcoming Appointments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingAppointments.map(appointment => {
                    const slot = availableSlots.find(s => s.id === appointment.slotId);
                    if (!slot) return null;
                    return (
                      <AppointmentCard 
                        key={appointment.id} 
                        appointment={appointment} 
                        slot={slot}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {pastAppointments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Past Appointments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastAppointments.map(appointment => {
                    const slot = availableSlots.find(s => s.id === appointment.slotId);
                    if (!slot) return null;
                    return (
                      <AppointmentCard 
                        key={appointment.id} 
                        appointment={appointment} 
                        slot={slot}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {pendingAppointments.length === 0 && upcomingAppointments.length === 0 && pastAppointments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No appointments yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-4 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DocConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
