const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const { Pool } = require('pg');

const NEON_HOST = 'ep-lucky-silence-b3vzkr8d.c-4.ap-southeast-1.aws.neon.tech';

async function getNeonIp() {
  return new Promise((resolve) => {
    dns.resolve4(NEON_HOST, (err, addresses) => {
      if (!err && addresses && addresses.length > 0) {
        resolve(addresses[0]);
      } else {
        resolve('52.76.246.190');
      }
    });
  });
}

async function migrate() {
  const hostIp = await getNeonIp();
  const pool = new Pool({
    host: hostIp,
    port: 5432,
    user: 'neondb_owner',
    password: 'npg_Z0xMEcgFzj1l',
    database: 'neondb',
    ssl: { rejectUnauthorized: false, servername: NEON_HOST },
  });

  const client = await pool.connect();
  try {
    console.log('Creating assets and asset_assignments tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS assets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        brand TEXT,
        model TEXT,
        serial_number TEXT,
        cost NUMERIC(10,2),
        status TEXT NOT NULL DEFAULT 'available',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS asset_assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
        assigned_date DATE DEFAULT CURRENT_DATE,
        return_date DATE,
        status TEXT DEFAULT 'assigned',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Creating expenses table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
        category TEXT NOT NULL,
        amount NUMERIC(10,2) NOT NULL,
        currency TEXT DEFAULT 'INR',
        date DATE NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Creating payroll tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS payroll_runs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        company_id UUID,
        period_month INTEGER NOT NULL,
        period_year INTEGER NOT NULL,
        status TEXT DEFAULT 'draft',
        total_employees INTEGER DEFAULT 0,
        total_gross NUMERIC(12,2) DEFAULT 0,
        total_deductions NUMERIC(12,2) DEFAULT 0,
        total_net NUMERIC(12,2) DEFAULT 0,
        finalized_at TIMESTAMPTZ,
        approved_by UUID,
        approved_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(tenant_id, period_month, period_year)
      );

      CREATE TABLE IF NOT EXISTS payroll_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE,
        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
        working_days NUMERIC(4,1),
        paid_days NUMERIC(4,1),
        lop_days NUMERIC(4,1),
        gross_salary NUMERIC(10,2),
        total_earnings NUMERIC(10,2),
        total_deductions NUMERIC(10,2),
        net_salary NUMERIC(10,2),
        pf_employee NUMERIC(10,2),
        esi_employee NUMERIC(10,2),
        professional_tax NUMERIC(10,2),
        tds NUMERIC(10,2),
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(payroll_run_id, employee_id)
      );

      CREATE TABLE IF NOT EXISTS salary_components (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        type TEXT NOT NULL,
        is_taxable BOOLEAN DEFAULT TRUE,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Creating shifts, holidays, recruitment, announcements tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS shifts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        break_duration INTEGER DEFAULT 60,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS holidays (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        date DATE NOT NULL,
        is_optional BOOLEAN DEFAULT FALSE,
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS job_openings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        department TEXT,
        location TEXT,
        positions INTEGER DEFAULT 1,
        status TEXT DEFAULT 'published',
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS candidates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        job_opening_id UUID REFERENCES job_openings(id),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        mobile TEXT,
        status TEXT DEFAULT 'applied',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS interviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        candidate_id UUID REFERENCES candidates(id),
        job_opening_id UUID REFERENCES job_openings(id),
        round_number INTEGER DEFAULT 1,
        scheduled_at TIMESTAMPTZ,
        interviewer_name TEXT,
        status TEXT DEFAULT 'scheduled',
        feedback TEXT,
        rating INTEGER,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS announcements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_pinned BOOLEAN DEFAULT FALSE,
        published_at TIMESTAMPTZ DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Creating employee detail tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS employee_personal_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        current_address JSONB,
        permanent_address JSONB,
        same_as_current BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employee_bank_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        account_holder_name TEXT,
        bank_name TEXT,
        account_number TEXT,
        ifsc_code TEXT,
        bank_branch TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employee_statutory_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        pan TEXT,
        aadhaar TEXT,
        uan TEXT,
        pf_member_id TEXT,
        esi_number TEXT,
        pt_state TEXT,
        tax_regime TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employee_emergency_contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        name TEXT,
        relationship TEXT,
        mobile TEXT,
        alternate_mobile TEXT,
        address TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employee_education (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        qualification TEXT,
        institution TEXT,
        university TEXT,
        specialization TEXT,
        year_of_passing INTEGER,
        percentage NUMERIC(5,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employee_experience (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        company_name TEXT,
        designation TEXT,
        start_date DATE,
        end_date DATE,
        last_ctc NUMERIC(10,2),
        reason_for_leaving TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('SUCCESS: All HRMS tables created dynamically in Neon PostgreSQL!');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});

