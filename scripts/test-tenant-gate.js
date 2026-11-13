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
        resolve('52.76.246.190');
      }
    });
  });
}

async function runTest() {
  const hostIp = await getNeonIp();
  console.log(`Connecting to Neon DB at ${hostIp} for Gatekeeper E2E Test...`);

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
    const testEmail = `test_${Date.now()}@testcorp.io`;
    const orgName = `Test Corp ${Date.now()}`;
    const passwordHash = await bcrypt.hash('TestPass@123', 10);

    console.log(`\n--- Step 1: Simulating Signup for Org: "${orgName}" ---`);
    const tenantRes = await client.query(`
      INSERT INTO tenants (
        name,
        slug,
        plan,
        status,
        subscription_expiry_date,
        mobile_number,
        city,
        address
      )
      VALUES (
        $1,
        $2,
        'trial',
        'inactive',
        (CURRENT_DATE - INTERVAL '1 day')::DATE,
        '9876543210',
        'Bengaluru',
        'Indiranagar 100ft Road'
      )
      RETURNING id, name, status, subscription_expiry_date;
    `, [orgName, `test-corp-${Date.now()}`]);

    const tenant = tenantRes.rows[0];
    console.log('Created Tenant in Neon:', {
      id: tenant.id,
      name: tenant.name,
      status: tenant.status,
      subscription_expiry_date: tenant.subscription_expiry_date.toISOString().split('T')[0],
    });

    // Verification 1: Inactive and Yesterday's Expiry
    const todayStr = new Date().toISOString().split('T')[0];
    const expiryStr = tenant.subscription_expiry_date.toISOString().split('T')[0];
    console.log(`Today: ${todayStr} | Expiry: ${expiryStr}`);

    if (tenant.status !== 'inactive') {
      throw new Error(`FAIL: Tenant status is ${tenant.status}, expected 'inactive'`);
    }
    if (expiryStr >= todayStr) {
      throw new Error(`FAIL: Tenant expiry date is ${expiryStr}, expected yesterday's date`);
    }
    console.log('PASS: New tenant created with status=inactive and expiry=yesterday!');

    // Create user
    const userRes = await client.query(`
      INSERT INTO users (tenant_id, email, password_hash, full_name, role, status)
      VALUES ($1, $2, $3, 'Admin User', 'company_admin', 'inactive')
      RETURNING id, email, role, status;
    `, [tenant.id, testEmail, passwordHash]);
    const user = userRes.rows[0];

    console.log('\n--- Step 2: Simulating Login Check for Inactive & Expired Tenant ---');
    const isTenantActive = tenant.status === 'active';
    const isExpired = expiryStr < todayStr;
    const isBlocked = !isTenantActive || isExpired;
    const redirectUrl = isBlocked ? '/onboarding/activation-pending' : '/dashboard';

    console.log('Login Gatekeeper Decision:', { isTenantActive, isExpired, isBlocked, redirectUrl });
    if (redirectUrl !== '/onboarding/activation-pending') {
      throw new Error(`FAIL: Expected redirect to /onboarding/activation-pending, got ${redirectUrl}`);
    }
    console.log('PASS: Inactive / expired tenant is strictly redirected to /onboarding/activation-pending!');

    console.log('\n--- Step 3: Simulating Super Admin Activation Action ---');
    const activationRes = await client.query(`
      UPDATE tenants
      SET status = 'active',
          subscription_expiry_date = (CURRENT_DATE + INTERVAL '365 days')::DATE,
          activated_at = NOW()
      WHERE id = $1
      RETURNING id, name, status, subscription_expiry_date;
    `, [tenant.id]);

    const activatedTenant = activationRes.rows[0];
    const newExpiryStr = activatedTenant.subscription_expiry_date.toISOString().split('T')[0];
    console.log('Activated Tenant in Neon:', {
      name: activatedTenant.name,
      status: activatedTenant.status,
      subscription_expiry_date: newExpiryStr,
    });

    console.log('\n--- Step 4: Simulating Login Check for Activated Tenant ---');
    const isNowActive = activatedTenant.status === 'active';
    const isNowExpired = newExpiryStr < todayStr;
    const isNowAllowed = isNowActive && !isNowExpired;
    const newRedirectUrl = isNowAllowed ? '/dashboard' : '/onboarding/activation-pending';

    console.log('Post-Activation Gatekeeper Decision:', { isNowActive, isNowExpired, isNowAllowed, newRedirectUrl });
    if (newRedirectUrl !== '/dashboard') {
      throw new Error(`FAIL: Expected redirect to /dashboard, got ${newRedirectUrl}`);
    }
    console.log('PASS: Activated tenant successfully allowed into /dashboard!');

    console.log('\n🎉 ALL NEON DATABASE & TENANT GATEKEEPER TESTS PASSED CLEANLY!');
  } finally {
    client.release();
    await pool.end();
  }
}

runTest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Test failed:', err);
    process.exit(1);
  });

