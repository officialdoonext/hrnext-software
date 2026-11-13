const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const NEON_HOST = 'ep-lucky-silence-b3vzkr8d.c-4.ap-southeast-1.aws.neon.tech';

async function getNeonIp() {
  return new Promise((resolve) => {
    dns.resolve4(NEON_HOST, (err, addresses) => {
      if (!err && addresses && addresses.length > 0) {
        resolve(addresses[0]);
      } else {
        resolve('52.76.246.190'); // Fallback to verified Neon AWS IP
      }
    });
  });
}

async function migrate() {
  const hostIp = await getNeonIp();
  console.log(`Connecting to Neon PostgreSQL at ${hostIp} (SNI: ${NEON_HOST})...`);

  const pool = new Pool({
    host: hostIp,
    port: 5432,
    user: 'neondb_owner',
    password: 'npg_Z0xMEcgFzj1l',
    database: 'neondb',
    ssl: {
      rejectUnauthorized: false,
      servername: NEON_HOST,
    },
  });

  const client = await pool.connect();

  try {
    console.log('Connected to Neon PostgreSQL successfully!');
    console.log('Enabling extensions...');
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    console.log('Creating tenants table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS tenants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        plan TEXT NOT NULL DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'professional', 'enterprise')),
        status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'suspended', 'cancelled')),
        subscription_expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE - INTERVAL '1 day'),
        mobile_number TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        industry TEXT,
        max_employees INTEGER NOT NULL DEFAULT 25,
        activated_at TIMESTAMPTZ,
        activated_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_tenants_status_expiry ON tenants(status, subscription_expiry_date);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);');

    console.log('Creating users table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT,
        role TEXT NOT NULL DEFAULT 'employee',
        status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'locked')),
        last_login_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_tenant_role ON users(tenant_id, role);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');

    console.log('Creating companies table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        legal_name TEXT,
        registration_number TEXT,
        pan TEXT,
        gstin TEXT,
        industry TEXT,
        website TEXT,
        email TEXT,
        phone TEXT,
        address JSONB NOT NULL DEFAULT '{}'::jsonb,
        logo_url TEXT,
        financial_year_start INTEGER NOT NULL DEFAULT 4,
        currency TEXT NOT NULL DEFAULT 'INR',
        timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Creating branches table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS branches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL,
        address JSONB NOT NULL DEFAULT '{}'::jsonb,
        email TEXT,
        phone TEXT,
        head_id UUID,
        is_headquarters BOOLEAN NOT NULL DEFAULT FALSE,
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(tenant_id, code)
      );
    `);

    console.log('Creating departments table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        parent_id UUID REFERENCES departments(id),
        head_id UUID,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(tenant_id, code)
      );
    `);

    console.log('Creating designations table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS designations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        department_id UUID REFERENCES departments(id),
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(tenant_id, code)
      );
    `);

    console.log('Creating employees table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        branch_id UUID REFERENCES branches(id),
        department_id UUID REFERENCES departments(id),
        designation_id UUID REFERENCES designations(id),
        reporting_manager_id UUID REFERENCES employees(id),
        user_id UUID REFERENCES users(id),
        employee_id TEXT NOT NULL,
        first_name TEXT NOT NULL,
        middle_name TEXT,
        last_name TEXT NOT NULL,
        date_of_birth DATE,
        gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
        marital_status TEXT,
        blood_group TEXT,
        nationality TEXT DEFAULT 'Indian',
        photo_url TEXT,
        joining_date DATE NOT NULL,
        employment_type TEXT NOT NULL DEFAULT 'full_time' CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern')),
        employment_status TEXT NOT NULL DEFAULT 'active' CHECK (employment_status IN ('active', 'probation', 'notice_period', 'terminated', 'resigned', 'on_leave')),
        probation_end_date DATE,
        confirmation_date DATE,
        notice_period_days INTEGER NOT NULL DEFAULT 30,
        work_email TEXT NOT NULL,
        personal_email TEXT,
        mobile TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ,
        UNIQUE(tenant_id, employee_id),
        UNIQUE(tenant_id, work_email)
      );
    `);

    console.log('Creating attendance & leave tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS attendance_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        first_check_in TIMESTAMPTZ,
        last_check_out TIMESTAMPTZ,
        working_hours NUMERIC(5,2) DEFAULT 0,
        overtime_hours NUMERIC(5,2) DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'half_day', 'on_leave', 'holiday', 'weekly_off')),
        is_regularized BOOLEAN NOT NULL DEFAULT FALSE,
        source TEXT NOT NULL DEFAULT 'web' CHECK (source IN ('web', 'mobile_gps', 'biometric', 'manual')),
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(tenant_id, employee_id, date)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS leave_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        annual_allocation NUMERIC(4,1) NOT NULL DEFAULT 12.0,
        is_paid BOOLEAN DEFAULT TRUE,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(tenant_id, code)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS leave_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        leave_type_id UUID NOT NULL REFERENCES leave_types(id),
        from_date DATE NOT NULL,
        to_date DATE NOT NULL,
        total_days NUMERIC(5,2) NOT NULL,
        reason TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
        approver_id UUID REFERENCES users(id),
        rejection_reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Creating approval requests & audit logs...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS approval_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        module TEXT NOT NULL,
        entity_id UUID NOT NULL,
        requester_id UUID NOT NULL REFERENCES users(id),
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
        data JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID,
        old_values JSONB,
        new_values JSONB,
        ip_address INET,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Seeding default Super Admin user and platform tenant...');
    const superAdminPasswordHash = await bcrypt.hash('superadmin123', 10);

    await client.query(`
      INSERT INTO tenants (id, name, slug, plan, status, subscription_expiry_date, mobile_number, city, address)
      VALUES (
        '00000000-0000-0000-0000-000000000001',
        'PeopleCore SaaS Platform',
        'peoplecore-saas',
        'enterprise',
        'active',
        (CURRENT_DATE + INTERVAL '10 years')::DATE,
        '9999999999',
        'Hyderabad',
        'Corporate Headquarters'
      )
      ON CONFLICT (slug) DO UPDATE SET status = 'active';
    `);

    await client.query(`
      INSERT INTO users (id, tenant_id, email, password_hash, full_name, role, status)
      VALUES (
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'superadmin@peoplecore.io',
        $1,
        'Platform Super Admin',
        'super_admin',
        'active'
      )
      ON CONFLICT (email) DO UPDATE SET password_hash = $1, status = 'active';
    `, [superAdminPasswordHash]);

    console.log('SUCCESS: All tables created and super admin seeded in Neon DB!');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
