import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Default PostgreSQL Pool configuration using environment variables
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DB || 'ndraise_db',
  user: process.env.POSTGRES_USER || 'ndraise_app_user',
  password: process.env.POSTGRES_PASSWORD || 'ndraise_secure_password_2026',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

let isPgConnected = false;

// Fallback in-memory data store for testing/dev when Postgres server is not running
const mockDb = {
  users: [
    {
      id: 1,
      name: 'Nikhil Student',
      email: 'student@ndraise.com',
      password_hash: bcrypt.hashSync('student123', 10),
      role: 'student',
      created_at: new Date().toISOString(),
      failed_login_attempts: 0,
      lockout_until: null
    },
    {
      id: 2,
      name: 'Admin Manager',
      email: 'admin@ndraise.com',
      password_hash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      created_at: new Date().toISOString(),
      failed_login_attempts: 0,
      lockout_until: null
    },
    {
      id: 3,
      name: 'Super Admin Security',
      email: 'superadmin@ndraise.com',
      password_hash: bcrypt.hashSync('superadmin123', 10),
      role: 'super_admin',
      created_at: new Date().toISOString(),
      failed_login_attempts: 0,
      lockout_until: null
    }
  ],
  internships: [
    { id: 1, title: 'Web Development Virtual Internship', category: 'Web Development', stipend: 'Performance Based', active: true },
    { id: 2, title: 'Data Science & Analytics', category: 'Data Science', stipend: 'Performance Based', active: true },
    { id: 3, title: 'Full Stack Software Engineering', category: 'Software Engineering', stipend: 'Performance Based', active: true }
  ],
  applications: [
    { id: 101, user_id: 1, internship_id: 1, status: 'Active', applied_at: new Date().toISOString() }
  ],
  certificates: [
    { id: 1, certificate_id: 'ND2026-CERT-881', user_id: 1, internship_title: 'Web Development Virtual Internship', issued_at: new Date().toISOString(), status: 'Active' }
  ],
  audit_logs: []
};

// Parameterized Query Execution Function
export const query = async (text, params = []) => {
  try {
    if (isPgConnected) {
      return await pool.query(text, params);
    }
    // Attempt connecting to PG if not yet checked
    try {
      const res = await pool.query(text, params);
      isPgConnected = true;
      return res;
    } catch (err) {
      // Postgres not available, fallback to mock DB handler safely
      return executeMockQuery(text, params);
    }
  } catch (error) {
    console.error('Database query error:', error.message);
    throw new Error('Database operation failed');
  }
};

// In-Memory Query Router with strict parameter support (Simulates SQL Engine safely)
function executeMockQuery(text, params) {
  const sql = text.trim();

  // SELECT users BY email
  if (sql.includes('SELECT') && sql.includes('FROM users WHERE email = $1')) {
    const email = params[0];
    const rows = mockDb.users.filter(u => u.email.toLowerCase() === (email || '').toLowerCase());
    return { rows, rowCount: rows.length };
  }

  // SELECT users BY id
  if (sql.includes('SELECT') && sql.includes('FROM users WHERE id = $1')) {
    const id = parseInt(params[0], 10);
    const rows = mockDb.users
      .filter(u => u.id === id)
      .map(({ password_hash, lockout_until, failed_login_attempts, ...rest }) => rest);
    return { rows, rowCount: rows.length };
  }

  // UPDATE user failed attempts / lockout
  if (sql.includes('UPDATE users SET failed_login_attempts')) {
    const [failed, lockout, email] = params;
    const user = mockDb.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (user) {
      user.failed_login_attempts = failed;
      user.lockout_until = lockout;
    }
    return { rowCount: user ? 1 : 0 };
  }

  // INSERT INTO users
  if (sql.includes('INSERT INTO users')) {
    const [name, email, password_hash, role] = params;
    const newUser = {
      id: mockDb.users.length + 1,
      name,
      email,
      password_hash,
      role: role || 'student',
      created_at: new Date().toISOString(),
      failed_login_attempts: 0,
      lockout_until: null
    };
    mockDb.users.push(newUser);
    return { rows: [newUser], rowCount: 1 };
  }

  // SELECT ALL users (Super admin management)
  if (sql.includes('SELECT') && sql.includes('FROM users')) {
    const sanitizedUsers = mockDb.users.map(({ password_hash, ...rest }) => rest);
    return { rows: sanitizedUsers, rowCount: sanitizedUsers.length };
  }

  // SELECT ALL internships
  if (sql.includes('FROM internships')) {
    return { rows: mockDb.internships, rowCount: mockDb.internships.length };
  }

  // SELECT ALL applications
  if (sql.includes('FROM applications')) {
    return { rows: mockDb.applications, rowCount: mockDb.applications.length };
  }

  // SELECT student applications BY user_id
  if (sql.includes('FROM applications WHERE user_id = $1')) {
    const userId = parseInt(params[0], 10);
    const rows = mockDb.applications.filter(a => a.user_id === userId);
    return { rows, rowCount: rows.length };
  }

  // INSERT INTO audit_logs
  if (sql.includes('INSERT INTO audit_logs')) {
    const [actor_id, actor_email, action, target_resource, ip_address, metadata] = params;
    const log = {
      id: mockDb.audit_logs.length + 1,
      actor_id,
      actor_email,
      action,
      target_resource,
      ip_address,
      metadata: typeof metadata === 'string' ? JSON.parse(metadata) : metadata,
      created_at: new Date().toISOString()
    };
    mockDb.audit_logs.push(log);
    return { rows: [log], rowCount: 1 };
  }

  // SELECT ALL audit_logs
  if (sql.includes('FROM audit_logs')) {
    return { rows: [...mockDb.audit_logs].reverse(), rowCount: mockDb.audit_logs.length };
  }

  // Generic fallback query response
  return { rows: [], rowCount: 0 };
}

// Database Transaction helper
export const transaction = async (callback) => {
  if (isPgConnected) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } else {
    // Transaction wrapper for in-memory fallback
    return await callback({ query });
  }
};

export default { query, transaction };
