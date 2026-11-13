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

async function check() {
  const hostIp = await getNeonIp();
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
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Tables in Neon:');
    for (const row of res.rows) {
      const countRes = await client.query(`SELECT COUNT(*) FROM "${row.table_name}"`);
      console.log(` - ${row.table_name}: ${countRes.rows[0].count} rows`);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

check().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
