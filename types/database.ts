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
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          plan: 'trial' | 'starter' | 'professional' | 'enterprise'
          status: 'active' | 'inactive' | 'suspended'
          max_employees: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>
      }
      companies: {
        Row: {
          id: string
          tenant_id: string
          name: string
          legal_name: string | null
          registration_number: string | null
          pan: string | null
          gstin: string | null
          industry: string | null
          website: string | null
          email: string | null
          phone: string | null
          address: Json | null
          logo_url: string | null
          financial_year_start: number
          currency: string
          timezone: string
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
      }
      branches: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          code: string | null
          type: string | null
          address: Json | null
          email: string | null
          phone: string | null
          head_id: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['branches']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['branches']['Insert']>
      }
      departments: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          code: string | null
          parent_id: string | null
          head_id: string | null
          description: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['departments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['departments']['Insert']>
      }
      designations: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          code: string | null
          department_id: string | null
          level: number | null
          description: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['designations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['designations']['Insert']>
      }
      job_grades: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          code: string | null
          min_salary: number | null
          max_salary: number | null
          description: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['job_grades']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['job_grades']['Insert']>
      }
      cost_centres: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          code: string
          description: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cost_centres']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cost_centres']['Insert']>
      }
      employees: {
        Row: {
          id: string
          tenant_id: string
          company_id: string
          branch_id: string | null
          department_id: string | null
          designation_id: string | null
          job_grade_id: string | null
          cost_centre_id: string | null
          reporting_manager_id: string | null
          employee_id: string
          first_name: string
          middle_name: string | null
          last_name: string
          date_of_birth: string | null
          gender: 'male' | 'female' | 'other' | null
          marital_status: 'single' | 'married' | 'divorced' | 'widowed' | null
          blood_group: string | null
          personal_email: string | null
          mobile: string | null
          alternate_mobile: string | null
          nationality: string | null
          photo_url: string | null
          joining_date: string
          employment_type: 'full_time' | 'part_time' | 'contract' | 'intern'
          employment_status: 'active' | 'inactive' | 'terminated' | 'resigned' | 'on_leave'
          probation_end_date: string | null
          confirmation_date: string | null
          notice_period_days: number | null
          work_email: string | null
          work_phone: string | null
          work_location: string | null
          user_id: string | null
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employees']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employees']['Insert']>
      }
      employee_personal_details: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          current_address: Json | null
          permanent_address: Json | null
          same_as_current: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_personal_details']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_personal_details']['Insert']>
      }
      employee_bank_accounts: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          account_holder_name: string
          bank_name: string
          account_number: string
          ifsc_code: string
          branch_name: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_bank_accounts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_bank_accounts']['Insert']>
      }
      employee_statutory_details: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          pan: string | null
          aadhaar_last4: string | null
          aadhaar_encrypted: string | null
          uan: string | null
          pf_member_id: string | null
          esi_number: string | null
          pt_state: string | null
          tax_regime: 'old' | 'new' | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_statutory_details']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_statutory_details']['Insert']>
      }
      employee_education: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          qualification: string
          institution: string
          university: string | null
          specialization: string | null
          year_of_passing: number | null
          percentage: number | null
          certificate_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_education']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_education']['Insert']>
      }
      employee_experience: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          company_name: string
          designation: string | null
          start_date: string
          end_date: string | null
          last_drawn_salary: number | null
          reason_for_leaving: string | null
          relieving_letter_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_experience']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_experience']['Insert']>
      }
      employee_documents: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          document_type: string
          document_name: string
          file_url: string
          file_size: number | null
          expiry_date: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_documents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_documents']['Insert']>
      }
      employee_salary_assignments: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          salary_structure_id: string | null
          annual_ctc: number
          monthly_ctc: number
          gross_salary: number
          net_salary: number | null
          effective_date: string
          payroll_group_id: string | null
          is_current: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_salary_assignments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_salary_assignments']['Insert']>
      }
      employee_emergency_contacts: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          contact_name: string
          relationship: string
          mobile: string
          alternate_mobile: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['employee_emergency_contacts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['employee_emergency_contacts']['Insert']>
      }
      users: {
        Row: {
          id: string
          tenant_id: string | null
          employee_id: string | null
          email: string
          full_name: string | null
          role: 'super_admin' | 'hr_admin' | 'hr_manager' | 'manager' | 'employee'
          status: 'active' | 'inactive'
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      audit_logs: {
        Row: {
          id: string
          tenant_id: string | null
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['audit_logs']['Row'], 'id' | 'created_at'>
        Update: never
      }
      leave_types: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          code: string
          days_allowed: number
          carry_forward: boolean
          encashable: boolean
          paid: boolean
          requires_approval: boolean
          description: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leave_types']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leave_types']['Insert']>
      }
      leave_applications: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          leave_type_id: string
          from_date: string
          to_date: string
          days: number
          half_day: boolean
          half_day_session: 'morning' | 'afternoon' | null
          reason: string | null
          status: 'pending' | 'approved' | 'rejected' | 'cancelled'
          approved_by: string | null
          approved_at: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leave_applications']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leave_applications']['Insert']>
      }
      attendance_records: {
        Row: {
          id: string
          employee_id: string
          tenant_id: string
          date: string
          check_in: string | null
          check_out: string | null
          working_hours: number | null
          overtime_hours: number | null
          status: 'present' | 'absent' | 'half_day' | 'on_leave' | 'holiday' | 'weekend'
          is_regularized: boolean
          source: 'biometric' | 'manual' | 'mobile' | 'web'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['attendance_records']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['attendance_records']['Insert']>
      }
      holidays: {
        Row: {
          id: string
          company_id: string
          tenant_id: string
          name: string
          date: string
          type: 'national' | 'restricted' | 'company'
          applicable_branches: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['holidays']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['holidays']['Insert']>
      }
      announcements: {
        Row: {
          id: string
          tenant_id: string
          title: string
          content: string
          type: 'general' | 'urgent' | 'policy' | 'event'
          audience: 'all' | 'department' | 'branch' | 'specific'
          target_ids: string[] | null
          published_at: string | null
          expires_at: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['announcements']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>
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
  }
}

// Convenience types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

