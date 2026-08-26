const prisma = require('./lib/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  const accounts = [
    { name: 'NDRise Admin', email: 'admin@ndtech.com', pass: 'Admin123!', role: 'ADMIN' },
    { name: 'NDRaise Admin', email: 'admin@ndraise.com', pass: 'admin123', role: 'ADMIN' },
    { name: 'NDRaise Super Admin', email: 'superadmin@ndraise.com', pass: 'superadmin123', role: 'SUPER_ADMIN' }
  ];

  for (const acc of accounts) {
    const password = await bcrypt.hash(acc.pass, 10);
    await prisma.user.upsert({
      where: { email: acc.email },
      update: { password, role: acc.role },
      create: { name: acc.name, email: acc.email, password, role: acc.role, avatar: '/admin-avatar.svg' }
    });
    console.log(`✅ LIVE NEON DB SEEDED: ${acc.email} (${acc.role})`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
