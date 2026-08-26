const prisma = require('../lib/prisma');

const logAuditEvent = async ({ actorId, actorEmail, action, targetResource, req, metadata = {} }) => {
  try {
    const ipAddress = req?.ip || req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress || '127.0.0.1';

    await prisma.auditLog.create({
      data: {
        actorId: actorId || null,
        actorEmail: actorEmail || 'anonymous',
        action,
        targetResource: targetResource || null,
        ipAddress,
        metadata
      }
    });
  } catch (err) {
    console.error('Audit logging failed silently:', err.message);
  }
};

module.exports = {
  logAuditEvent
};
