import { query } from '../db.js';

export const logAuditEvent = async ({ actorId, actorEmail, action, targetResource, req, metadata = {} }) => {
  try {
    const ipAddress = req?.ip || req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress || '127.0.0.1';

    await query(
      `INSERT INTO audit_logs (actor_id, actor_email, action, target_resource, ip_address, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        actorId || null,
        actorEmail || 'anonymous',
        action,
        targetResource || null,
        ipAddress,
        JSON.stringify(metadata)
      ]
    );
  } catch (err) {
    console.error('Audit logging failed silently:', err.message);
  }
};
