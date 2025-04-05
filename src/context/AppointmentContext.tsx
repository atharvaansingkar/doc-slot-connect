
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  addSlot: (slot: Omit<SlotType, 'id'>) => void;
  bookSlot: (slotId: string, isOnline: boolean) => void;
  approveAppointment: (appointmentId: string, meetLink?: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  completeAppointment: (appointmentId: string, notes?: string) => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  // Generate a simple ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addSlot = (slot: Omit<SlotType, 'id'>) => {
    const newSlot = { 
      ...slot, 
      id: generateId(),
      isBooked: false
    };
    setAvailableSlots([...availableSlots, newSlot]);
  };

  const bookSlot = (slotId: string, isOnline: boolean) => {
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
          id: generateId(),
          slotId,
          doctorId: slot.doctorId,
          userId: currentUser.id,
          status: 'pending',
          isOnline,
          createdAt: new Date().toISOString(),
        };
        setAppointments([...appointments, newAppointment]);
      }
    }
  };

  const approveAppointment = (appointmentId: string, meetLink?: string) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'approved', meetLink } 
          : appointment
      )
    );
  };

  const cancelAppointment = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (appointment) {
      // Update appointment status
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
    }
  };

  const completeAppointment = (appointmentId: string, notes?: string) => {
    setAppointments(
      appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'completed', notes: notes || appointment.notes } 
          : appointment
      )
    );
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
