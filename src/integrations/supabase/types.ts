export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_id: string
          appointment_type: string | null
          approved_at: string | null
          calendar_event_id: string | null
          created_at: string | null
          doctor_id: string | null
          google_meet_link: string | null
          note: string | null
          patient_id: string | null
          scheduled_time: string | null
          status: string | null
        }
        Insert: {
          appointment_id?: string
          appointment_type?: string | null
          approved_at?: string | null
          calendar_event_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          google_meet_link?: string | null
          note?: string | null
          patient_id?: string | null
          scheduled_time?: string | null
          status?: string | null
        }
        Update: {
          appointment_id?: string
          appointment_type?: string | null
          approved_at?: string | null
          calendar_event_id?: string | null
          created_at?: string | null
          doctor_id?: string | null
          google_meet_link?: string | null
          note?: string | null
          patient_id?: string | null
          scheduled_time?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      doctor_availability: {
        Row: {
          day_of_week: string | null
          doctor_id: string | null
          end_time: string | null
          id: string
          is_available: boolean | null
          start_time: string | null
        }
        Insert: {
          day_of_week?: string | null
          doctor_id?: string | null
          end_time?: string | null
          id?: string
          is_available?: boolean | null
          start_time?: string | null
        }
        Update: {
          day_of_week?: string | null
          doctor_id?: string | null
          end_time?: string | null
          id?: string
          is_available?: boolean | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
        ]
      }
      doctor_patient_link: {
        Row: {
          doctor_id: string | null
          id: string
          linked_at: string | null
          patient_id: string | null
        }
        Insert: {
          doctor_id?: string | null
          id?: string
          linked_at?: string | null
          patient_id?: string | null
        }
        Update: {
          doctor_id?: string | null
          id?: string
          linked_at?: string | null
          patient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_patient_link_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "doctor_patient_link_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      doctors: {
        Row: {
          degree: string | null
          doctor_id: string
          is_active: boolean | null
          license_number: string | null
          name: string
        }
        Insert: {
          degree?: string | null
          doctor_id: string
          is_active?: boolean | null
          license_number?: string | null
          name: string
        }
        Update: {
          degree?: string | null
          doctor_id?: string
          is_active?: boolean | null
          license_number?: string | null
          name?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          access_code: string | null
          access_code_expiry: string | null
          age: number | null
          alcohol_consumption: string | null
          chronic_conditions: string | null
          current_medication: string | null
          dietary_preferences: string | null
          dob: string | null
          exercise_frequency: string | null
          family_medical_history: string | null
          first_name: string
          gender: string | null
          last_name: string | null
          medical_history: string | null
          patient_id: string
          phone_number: string | null
          severe_allergies: string | null
          smoking_habits: string | null
        }
        Insert: {
          access_code?: string | null
          access_code_expiry?: string | null
          age?: number | null
          alcohol_consumption?: string | null
          chronic_conditions?: string | null
          current_medication?: string | null
          dietary_preferences?: string | null
          dob?: string | null
          exercise_frequency?: string | null
          family_medical_history?: string | null
          first_name: string
          gender?: string | null
          last_name?: string | null
          medical_history?: string | null
          patient_id: string
          phone_number?: string | null
          severe_allergies?: string | null
          smoking_habits?: string | null
        }
        Update: {
          access_code?: string | null
          access_code_expiry?: string | null
          age?: number | null
          alcohol_consumption?: string | null
          chronic_conditions?: string | null
          current_medication?: string | null
          dietary_preferences?: string | null
          dob?: string | null
          exercise_frequency?: string | null
          family_medical_history?: string | null
          first_name?: string
          gender?: string | null
          last_name?: string | null
          medical_history?: string | null
          patient_id?: string
          phone_number?: string | null
          severe_allergies?: string | null
          smoking_habits?: string | null
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          notes: string | null
          prescription_id: string
          prescription_url: string | null
          session_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          notes?: string | null
          prescription_id?: string
          prescription_url?: string | null
          session_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          notes?: string | null
          prescription_id?: string
          prescription_url?: string | null
          session_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      record_access_requests: {
        Row: {
          doctor_id: string | null
          patient_id: string | null
          request_id: string
          request_status: string | null
          requested_at: string | null
          responded_at: string | null
        }
        Insert: {
          doctor_id?: string | null
          patient_id?: string | null
          request_id?: string
          request_status?: string | null
          requested_at?: string | null
          responded_at?: string | null
        }
        Update: {
          doctor_id?: string | null
          patient_id?: string | null
          request_id?: string
          request_status?: string | null
          requested_at?: string | null
          responded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "record_access_requests_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "record_access_requests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      reports: {
        Row: {
          report_id: string
          report_type: string | null
          report_url: string | null
          session_id: string | null
          summary: string | null
          uploaded_at: string | null
        }
        Insert: {
          report_id?: string
          report_type?: string | null
          report_url?: string | null
          session_id?: string | null
          summary?: string | null
          uploaded_at?: string | null
        }
        Update: {
          report_id?: string
          report_type?: string | null
          report_url?: string | null
          session_id?: string | null
          summary?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      sessions: {
        Row: {
          doctor_id: string | null
          patient_id: string | null
          session_id: string
          timestamp: string | null
        }
        Insert: {
          doctor_id?: string | null
          patient_id?: string | null
          session_id?: string
          timestamp?: string | null
        }
        Update: {
          doctor_id?: string | null
          patient_id?: string | null
          session_id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "sessions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
