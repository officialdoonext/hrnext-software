-- ============================================================
-- PeopleCore HRMS - Migration 003: Recruitment & Onboarding
-- ============================================================

-- Job Openings
CREATE TABLE IF NOT EXISTS job_openings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  title TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  designation_id UUID REFERENCES designations(id),
  branch_id UUID REFERENCES branches(id),
  vacancies INTEGER NOT NULL DEFAULT 1,
  experience_level TEXT DEFAULT 'mid' CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead', 'executive')),
  job_type TEXT DEFAULT 'full_time' CHECK (job_type IN ('full_time', 'part_time', 'contract', 'internship')),
  salary_range_min NUMERIC(12, 2),
  salary_range_max NUMERIC(12, 2),
  description TEXT,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'paused', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Candidates
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  current_company TEXT,
  experience_years NUMERIC(4, 1),
  current_ctc NUMERIC(12, 2),
  expected_ctc NUMERIC(12, 2),
  notice_period_days INTEGER,
  source TEXT DEFAULT 'LinkedIn',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hired', 'rejected', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Job Applications (Pipeline)
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  job_opening_id UUID NOT NULL REFERENCES job_openings(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  stage TEXT NOT NULL DEFAULT 'applied' CHECK (stage IN ('applied', 'screening', 'interview', 'offer', 'hired', 'rejected')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_opening_id, candidate_id)
);

-- Interviews
CREATE TABLE IF NOT EXISTS interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
  interviewer_id UUID REFERENCES employees(id),
  round_name TEXT NOT NULL, -- Technical Round 1, System Design, HR Discussion
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 45,
  mode TEXT DEFAULT 'video' CHECK (mode IN ('in_person', 'video', 'phone')),
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  feedback TEXT,
  rating INTEGER,
  recommendation TEXT CHECK (recommendation IN ('strong_hire', 'hire', 'neutral', 'no_hire')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Onboarding Records
CREATE TABLE IF NOT EXISTS onboarding_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidates(id),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('pending', 'in_progress', 'completed')),
  progress_percent INTEGER NOT NULL DEFAULT 0,
  target_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Onboarding Checklist Tasks
CREATE TABLE IF NOT EXISTS onboarding_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  onboarding_record_id UUID NOT NULL REFERENCES onboarding_records(id) ON DELETE CASCADE,
  task_name TEXT NOT NULL,
  category TEXT DEFAULT 'documentation' CHECK (category IN ('documentation', 'it_setup', 'hr_induction', 'team_intro', 'training')),
  assigned_to UUID REFERENCES employees(id),
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_job_openings_tenant ON job_openings(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_candidates_tenant_email ON candidates(tenant_id, email);
CREATE INDEX IF NOT EXISTS idx_applications_opening ON job_applications(job_opening_id, stage);
CREATE INDEX IF NOT EXISTS idx_interviews_scheduled ON interviews(scheduled_at, status);
CREATE INDEX IF NOT EXISTS idx_onboarding_status ON onboarding_records(status);

