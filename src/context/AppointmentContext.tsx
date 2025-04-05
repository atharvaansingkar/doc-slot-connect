import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

export type SlotType = {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  isBooked: boolean;
};

export type AppointmentType = {
  id: string;
  slotId: string;
  doctorId: string;
  userId: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  isOnline: boolean;
  meetLink?: string;
  notes?: string;
  createdAt: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  type: 'doctor' | 'patient';
};

type AppointmentContextType = {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  availableSlots: SlotType[];
  setAvailableSlots: (slots: SlotType[]) => void;
  appointments: AppointmentType[];
  setAppointments: (appointments: AppointmentType[]) => void;
  addSlot: (slot: Omit<SlotType, 'id'>) => Promise<void>;
  bookSlot: (slotId: string, isOnline: boolean) => Promise<void>;
  approveAppointment: (appointmentId: string, meetLink?: string) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  completeAppointment: (appointmentId: string, notes?: string) => Promise<void>;
  isLoading: boolean;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch available slots when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchAvailableSlots();
      fetchAppointments();
    }
  }, [currentUser]);

  // Fetch available slots from Supabase
  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch from Supabase doctor_availability table
      // For this demo, we'll just simulate it
      // In production, you'd write a real query to the doctor_availability table
      
      // Example query (would need to be adjusted based on your actual schema):
      // const { data, error } = await supabase
      //   .from('doctor_availability')
      //   .select('*')
      //   .eq('doctor_id', currentUser.id);
      
      // For now, let's keep using our dummy data
      // But in the future, this would be replaced with real data from Supabase
      
      // Simulate delay for loading state demonstration
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast({
        title: "Error",
        description: "Failed to load available slots",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Fetch appointments from Supabase
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch from Supabase appointments table
      // For this demo, we'll just simulate it
      // In production, you'd write a real query to the appointments table
      
      // Simulate delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Add a new availability slot
  const addSlot = async (slot: Omit<SlotType, 'id'>) => {
    setIsLoading(true);
    try {
      // In a real app with Supabase, you would insert into the doctor_availability table
      // For this demo, we'll use local state but simulating the API call
      
      const newSlot = { 
        ...slot, 
        id: Math.random().toString(36).substring(2, 9),
        isBooked: false
      };
      
      // Example of how you would do this with Supabase:
      // const { data, error } = await supabase
      //   .from('doctor_availability')
      //   .insert({
      //     doctor_id: slot.doctorId,
      //     day_of_week: new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(),
      //     start_time: slot.startTime,
      //     end_time: slot.endTime,
      //     is_available: true
      //   })
      //   .select();
      
      // For now, update the local state
      setAvailableSlots(prev => [...prev, newSlot]);
      
      toast({
        title: "Success",
        description: "Availability slot added successfully",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding slot:", error);
      toast({
        title: "Error",
        description: "Failed to add availability slot",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Book an appointment slot
  const bookSlot = async (slotId: string, isOnline: boolean) => {
    setIsLoading(true);
    try {
      // Mark slot as booked
      setAvailableSlots(
        availableSlots.map(slot => 
          slot.id === slotId ? { ...slot, isBooked: true } : slot
        )
      );

      // Create pending appointment
      if (currentUser) {
        const slot = availableSlots.find(s => s.id === slotId);
        if (slot) {
          const newAppointment: AppointmentType = {
            id: Math.random().toString(36).substring(2, 9),
            slotId,
            doctorId: slot.doctorId,
            userId: currentUser.id,
            status: 'pending',
            isOnline,
            createdAt: new Date().toISOString(),
          };
          
          // In a real app with Supabase, you would insert into the appointments table
          // Example:
          // const { data, error } = await supabase
          //   .from('appointments')
          //   .insert({
          //     patient_id: currentUser.id,
          //     doctor_id: slot.doctorId,
          //     scheduled_time: `${slot.date} ${slot.startTime}`,
          //     appointment_type: isOnline ? 'online' : 'offline',
          //   })
          //   .select();
          
          // For now, update the local state
          setAppointments(prev => [...prev, newAppointment]);
          
          toast({
            title: "Success",
            description: "Appointment request sent successfully",
          });
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error booking slot:", error);
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Approve an appointment
  const approveAppointment = async (appointmentId: string, meetLink?: string) => {
    setIsLoading(true);
    try {
      // In a real app with Supabase, you would update the appointments table
      // Example:
      // const { data, error } = await supabase
      //   .from('appointments')
      //   .update({
      //     status: 'approved',
      //     google_meet_link: meetLink,
      //     approved_at: new Date().toISOString()
      //   })
      //   .eq('appointment_id', appointmentId)
      //   .select();
      
      // For now, update the local state
      setAppointments(
        appointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'approved', meetLink } 
            : appointment
        )
      );
      
      toast({
        title: "Success",
        description: "Appointment approved successfully",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error approving appointment:", error);
      toast({
        title: "Error",
        description: "Failed to approve appointment",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId: string) => {
    setIsLoading(true);
    try {
      const appointment = appointments.find(a => a.id === appointmentId);
      
      if (appointment) {
        // In a real app with Supabase, you would update the appointments table
        // Example:
        // const { data, error } = await supabase
        //   .from('appointments')
        //   .update({
        //     status: 'cancelled'
        //   })
        //   .eq('appointment_id', appointmentId)
        //   .select();
        
        // Update appointment status in local state
        setAppointments(
          appointments.map(a => 
            a.id === appointmentId ? { ...a, status: 'cancelled' } : a
          )
        );
        
        // Free up the slot
        setAvailableSlots(
          availableSlots.map(slot => 
            slot.id === appointment.slotId ? { ...slot, isBooked: false } : slot
          )
        );
        
        toast({
          title: "Success",
          description: "Appointment cancelled successfully",
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Complete an appointment
  const completeAppointment = async (appointmentId: string, notes?: string) => {
    setIsLoading(true);
    try {
      // In a real app with Supabase, you would update the appointments table
      // Example:
      // const { data, error } = await supabase
      //   .from('appointments')
      //   .update({
      //     status: 'completed',
      //     note: notes
      //   })
      //   .eq('appointment_id', appointmentId)
      //   .select();
      
      // For now, update the local state
      setAppointments(
        appointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'completed', notes: notes || appointment.notes } 
            : appointment
        )
      );
      
      toast({
        title: "Success",
        description: "Appointment completed successfully",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast({
        title: "Error",
        description: "Failed to complete appointment",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        availableSlots,
        setAvailableSlots,
        appointments,
        setAppointments,
        addSlot,
        bookSlot,
        approveAppointment,
        cancelAppointment,
        completeAppointment,
        isLoading
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};
