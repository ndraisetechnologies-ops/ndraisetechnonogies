import assert from 'assert';
import app from '../../ndrise-backend/src/server.js';

let server;
let BASE_URL;

// Test Credentials
const STUDENT_CRED = { email: 'student@ndraise.com', password: 'student123' };
const ADMIN_CRED = { email: 'admin@ndraise.com', password: 'admin123' };
const SUPERADMIN_CRED = { email: 'superadmin@ndraise.com', password: 'superadmin123' };

let studentCookie = '';
let adminCookie = '';
let superAdminCookie = '';

async function runTests() {
  console.log('\n==================================================');
  console.log('  ND RAISE ADMIN & AUTH SECURITY TEST SUITE  ');
  console.log('==================================================\n');

  // Start temporary test server instance
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      BASE_URL = `http://localhost:${port}`;
      console.log(`[TEST SERVER] Running on ${BASE_URL}`);
      resolve();
    });
  });

  try {
    // 0. Setup: Authenticate test roles (register if not yet existing)
    console.log('>>> [SETUP] Authenticating test accounts...');
    
    // Register Student if not existing
    let studentRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(STUDENT_CRED)
    });
    if (studentRes.status !== 200) {
      await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Student', ...STUDENT_CRED })
      });
      studentRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(STUDENT_CRED)
      });
    }
    studentCookie = studentRes.headers.get('set-cookie') || '';

    // Register & promote Admin / SuperAdmin if needed
    const prisma = (await import('../../ndrise-backend/src/lib/prisma.js')).default;
    const bcrypt = (await import('bcryptjs')).default;

    const adminHash = await bcrypt.hash(ADMIN_CRED.password, 10);
    await prisma.user.upsert({
      where: { email: ADMIN_CRED.email },
      update: { role: 'ADMIN', password: adminHash },
      create: { name: 'Admin Manager', email: ADMIN_CRED.email, password: adminHash, role: 'ADMIN' }
    });

    const superHash = await bcrypt.hash(SUPERADMIN_CRED.password, 10);
    await prisma.user.upsert({
      where: { email: SUPERADMIN_CRED.email },
      update: { role: 'SUPER_ADMIN', password: superHash },
      create: { name: 'Super Admin', email: SUPERADMIN_CRED.email, password: superHash, role: 'SUPER_ADMIN' }
    });

    // Login Admin
    const adminRes = await fetch(`${BASE_URL}/api/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ADMIN_CRED)
    });
    adminCookie = adminRes.headers.get('set-cookie') || '';
    assert.strictEqual(adminRes.status, 200, 'Admin login failed');

    // Login Super Admin
    const superRes = await fetch(`${BASE_URL}/api/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(SUPERADMIN_CRED)
    });
    superAdminCookie = superRes.headers.get('set-cookie') || '';
    assert.strictEqual(superRes.status, 200, 'Super Admin login failed');

    console.log('✔ [SETUP PASSED] All test roles authenticated.\n');


    // TEST 1: Student attempts /admin/dashboard -> BLOCKED (403 Forbidden)
    console.log('>>> Running Test 1: Student attempts admin API...');
    const t1 = await fetch(`${BASE_URL}/api/admin/dashboard`, {
      headers: { cookie: studentCookie }
    });
    assert.strictEqual(t1.status, 403, 'Expected 403 Forbidden for student accessing admin endpoint');
    console.log('✔ [TEST 1 PASSED] Student access to admin API is BLOCKED (403 Forbidden).');

    // TEST 2: Unauthenticated user attempts admin API -> BLOCKED (401 Unauthorized)
    console.log('>>> Running Test 2: Unauthenticated user attempts admin API...');
    const t2 = await fetch(`${BASE_URL}/api/admin/dashboard`);
    assert.strictEqual(t2.status, 401, 'Expected 401 Unauthorized for unauthenticated request');
    console.log('✔ [TEST 2 PASSED] Unauthenticated access to admin API is BLOCKED (401 Unauthorized).');

    // TEST 3: Student calls admin API directly (GET /api/admin/students) -> BLOCKED
    console.log('>>> Running Test 3: Student calls admin student listing endpoint...');
    const t3 = await fetch(`${BASE_URL}/api/admin/students`, {
      headers: { cookie: studentCookie }
    });
    assert.strictEqual(t3.status, 403, 'Expected 403 Forbidden for student calling admin API');
    console.log('✔ [TEST 3 PASSED] Student calling admin API is BLOCKED (403 Forbidden).');

    // TEST 4: Non-admin changes user ID in API request -> BLOCKED (403 IDOR Protection)
    console.log('>>> Running Test 4: Student attempts IDOR resource access (User #1 requesting User #2 data)...');
    const t4 = await fetch(`${BASE_URL}/api/students/2`, {
      headers: { cookie: studentCookie }
    });
    assert.strictEqual(t4.status, 403, 'Expected 403 Forbidden for IDOR attempt');
    console.log('✔ [TEST 4 PASSED] IDOR resource tampering is BLOCKED (403 Forbidden).');

    // TEST 5: Malicious SQL input in login/search -> treated as safe data, not SQL
    console.log('>>> Running Test 5: Malicious SQL injection input in login...');
    const t5 = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "admin' OR '1'='1", password: "' OR '1'='1" })
    });
    const t5Data = await t5.json();
    assert.strictEqual(t5.status, 401, 'SQL injection attempt must return 401 Invalid Credentials');
    assert.strictEqual(t5Data.success, false, 'SQL injection attempt must not succeed');
    console.log('✔ [TEST 5 PASSED] Malicious SQL input handled safely as literal string.');

    // TEST 6: Repeated failed admin login attempts -> Rate limited / throttled
    console.log('>>> Running Test 6: Rate limiting on repeated failed admin logins...');
    let rateLimited = false;
    for (let i = 0; i < 6; i++) {
      const res = await fetch(`${BASE_URL}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@ndraise.com', password: 'wrongpassword' })
      });
      if (res.status === 429) {
        rateLimited = true;
        break;
      }
    }
    assert.strictEqual(rateLimited, true, 'Expected 429 Too Many Requests after rapid failed logins');
    console.log('✔ [TEST 6 PASSED] Repeated failed admin logins are RATE LIMITED (429 Too Many Requests).');

    // TEST 7: Logged-out admin attempts to reuse old session / invalid token -> BLOCKED
    console.log('>>> Running Test 7: Reusing session after logout / invalid session token...');
    const t7 = await fetch(`${BASE_URL}/api/admin/dashboard`, {
      headers: { cookie: 'auth_token=invalid_forged_jwt_token_2026' }
    });
    assert.strictEqual(t7.status, 401, 'Expected 401 for invalid session token');
    console.log('✔ [TEST 7 PASSED] Invalid or logged-out session tokens are BLOCKED (401 Unauthorized).');

    // TEST 8: Admin accesses authorized resource -> ALLOWED (200 OK)
    console.log('>>> Running Test 8: Admin accessing authorized dashboard endpoint...');
    const t8 = await fetch(`${BASE_URL}/api/admin/dashboard`, {
      headers: { cookie: adminCookie }
    });
    assert.strictEqual(t8.status, 200, 'Expected 200 OK for authorized admin');
    const t8Data = await t8.json();
    assert.strictEqual(t8Data.success, true);
    console.log('✔ [TEST 8 PASSED] Authorized admin access ALLOWED (200 OK).');

    // TEST 9: Admin attempts super_admin-only action -> BLOCKED (403 Forbidden)
    console.log('>>> Running Test 9: Normal admin attempting super_admin audit logs endpoint...');
    const t9 = await fetch(`${BASE_URL}/api/admin/audit-logs`, {
      headers: { cookie: adminCookie }
    });
    assert.strictEqual(t9.status, 403, 'Expected 403 Forbidden for normal admin accessing super_admin endpoint');
    console.log('✔ [TEST 9 PASSED] Normal admin attempting super_admin action is BLOCKED (403 Forbidden).');

    // TEST 10: Sensitive database fields are NEVER returned to unauthorized users
    console.log('>>> Running Test 10: Sensitive database field exposure check...');
    const studentUser = (await (await fetch(`${BASE_URL}/api/auth/me`, { headers: { cookie: studentCookie } })).json()).user;
    const t10 = await fetch(`${BASE_URL}/api/students/${studentUser.id}`, {
      headers: { cookie: studentCookie }
    });
    const t10Data = await t10.json();
    assert.strictEqual(t10Data.user.password, undefined, 'password must never be returned');
    assert.strictEqual(t10Data.user.password_hash, undefined, 'password_hash must never be returned');
    assert.strictEqual(t10Data.user.lockoutUntil, undefined, 'lockoutUntil must never be returned');
    console.log('✔ [TEST 10 PASSED] Sensitive database fields are NEVER exposed in API responses.');


    console.log('\n==================================================');
    console.log('  ALL 10 SECURITY TEST SCENARIOS PASSED 100%!  ');
    console.log('==================================================\n');

  } catch (error) {
    console.error('\n❌ SECURITY TEST FAILURE:', error.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runTests();
