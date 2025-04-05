
import { supabase } from '@/integrations/supabase/client';
import { UserType } from '@/context/AppointmentContext';

export const signUp = async (email: string, password: string, userType: 'doctor' | 'patient', name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType,
          name: name,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (userType === 'doctor') {
      await supabase.from('doctors').insert({
        doctor_id: data.user?.id,
        name: name,
      });
    } else {
      await supabase.from('patients').insert({
        patient_id: data.user?.id,
        first_name: name,
      });
    }

    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<UserType | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      return null;
    }

    const userType = data.user.user_metadata.user_type as 'doctor' | 'patient';
    const name = data.user.user_metadata.name as string;

    return {
      id: data.user.id,
      email: data.user.email || '',
      name: name,
      type: userType,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<UserType | null> => {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (!data.session?.user) {
      return null;
    }

    const user = data.session.user;
    const userType = user.user_metadata.user_type as 'doctor' | 'patient';
    const name = user.user_metadata.name as string;

    return {
      id: user.id,
      email: user.email || '',
      name: name,
      type: userType,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
