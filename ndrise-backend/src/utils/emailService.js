const nodemailer = require('nodemailer');

/**
 * Configure Nodemailer Transporter
 * Uses SMTP variables from process.env if available
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass }
    });
  }
  return null;
};

/**
 * Send Transactional Notification Email when student claims certificate
 */
const sendCertificateNotificationEmail = async ({ studentEmail, studentName, trackTitle, certificateCode }) => {
  const transporter = createTransporter();

  const appUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const loginUrl = `${appUrl}/login`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Certificate & LOR Ready - NDRise Technologies</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1.5px solid #34d399; padding: 30px; box-shadow: 0 20px 50px rgba(16, 185, 129, 0.15); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .title { color: #34d399; font-size: 24px; font-weight: 800; margin: 10px 0 0 0; }
        .badge { display: inline-block; background: rgba(52, 211, 153, 0.2); color: #34d399; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; border: 1px solid #34d399; margin-top: 10px; }
        .body-text { font-size: 15px; line-height: 1.6; color: #cbd5e1; margin: 20px 0; }
        .details-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 14px; }
        .details-row { margin-bottom: 8px; }
        .details-row:last-child { margin-bottom: 0; }
        .label { color: #94a3b8; }
        .value { color: #ffffff; font-weight: 700; }
        .btn-wrapper { text-align: center; margin: 30px 0; }
        .cta-btn { display: inline-block; background: linear-gradient(135deg, #10b981, #06b6d4); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 16px; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); }
        .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="font-size: 20px; font-weight: 900; color: #38bdf8;">NDRise Technologies</div>
          <h1 class="title">🎉 Certificate & LOR Issued!</h1>
          <div class="badge">ISO 9001:2015 Verified</div>
        </div>

        <div class="body-text">
          Dear <strong>${studentName || 'Student'}</strong>,<br/><br/>
          Congratulations! All your project deliverables for <strong>${trackTitle}</strong> have been reviewed and approved by admin. Your official verified <strong>Certificate of Completion & LOR</strong> are now processed.
        </div>

        <div class="details-box">
          <div class="details-row"><span class="label">Certificate Code:</span> <span class="value" style="color: #c084fc;">${certificateCode}</span></div>
          <div class="details-row"><span class="label">Internship Track:</span> <span class="value">${trackTitle}</span></div>
          <div class="details-row"><span class="label">Fee Status:</span> <span class="value" style="color: #34d399;">₹99 VERIFIED ✔</span></div>
          <div class="details-row"><span class="label">Delivery Option:</span> <span class="value">Check Dashboard → CERTIFICATES</span></div>
        </div>

        <div class="body-text" style="text-align: center;">
          Please log in to your Student Dashboard and check the <strong>CERTIFICATES</strong> menu option to view and download your documents.
        </div>

        <div class="btn-wrapper">
          <a href="${loginUrl}" class="cta-btn">Go to Dashboard → CERTIFICATES</a>
        </div>

        <div class="footer">
          NDRise Technologies | ISO 9001:2015 Certified Virtual Internship Platform<br/>
          This is an automated notification email sent to ${studentEmail}.
        </div>
      </div>
    </body>
    </html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"NDRise Technologies" <${process.env.SMTP_USER}>`,
        to: studentEmail,
        subject: `🎉 Check Your Dashboard — CERTIFICATES Option is Ready! (${certificateCode})`,
        html: htmlContent
      });
      console.log(`[EMAIL SERVICE] Notification email sent successfully to ${studentEmail}`);
    } catch (err) {
      console.error('[EMAIL SERVICE] Transporter send error:', err.message);
    }
  } else {
    console.log(`\n=============================================================`);
    console.log(`[EMAIL SERVICE DEV LOG] (No SMTP set in .env)`);
    console.log(`TO: ${studentEmail}`);
    console.log(`SUBJECT: 🎉 Check Your Dashboard — CERTIFICATES Option is Ready! (${certificateCode})`);
    console.log(`ACTION LINK: ${loginUrl}`);
    console.log(`=============================================================\n`);
  }
};

/**
 * Send Official Internship Offer Letter Email
 */
const sendOfferLetterEmail = async ({ studentEmail, studentName, trackTitle, offerCode, duration, stipend }) => {
  const transporter = createTransporter();

  const appUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const loginUrl = `${appUrl}/login`;
  const code = offerCode || `NDR-OFF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Official Internship Offer Letter - NDRise Technologies</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 620px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1.5px solid #38bdf8; padding: 32px; box-shadow: 0 20px 50px rgba(56, 189, 248, 0.15); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .title { color: #38bdf8; font-size: 24px; font-weight: 800; margin: 10px 0 0 0; }
        .badge { display: inline-block; background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; border: 1px solid #38bdf8; margin-top: 10px; }
        .body-text { font-size: 15px; line-height: 1.6; color: #cbd5e1; margin: 20px 0; }
        .details-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 20px 0; font-size: 14px; }
        .details-row { margin-bottom: 10px; }
        .details-row:last-child { margin-bottom: 0; }
        .label { color: #94a3b8; }
        .value { color: #ffffff; font-weight: 700; }
        .btn-wrapper { text-align: center; margin: 30px 0; }
        .cta-btn { display: inline-block; background: linear-gradient(135deg, #0284c7, #10b981); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 12px; font-weight: 800; font-size: 16px; box-shadow: 0 4px 20px rgba(2, 132, 199, 0.4); }
        .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="font-size: 20px; font-weight: 900; color: #38bdf8;">NDRise Technologies</div>
          <h1 class="title">🎉 Official Virtual Internship Offer Letter</h1>
          <div class="badge">ISO 9001:2015 Accredited Organization</div>
        </div>

        <div class="body-text">
          Dear <strong>${studentName || 'Student'}</strong>,<br/><br/>
          Congratulations! We are delighted to inform you that your application for the <strong>${trackTitle}</strong> Virtual Internship at <strong>NDRise Technologies</strong> has been reviewed and accepted!
        </div>

        <div class="details-box">
          <div class="details-row"><span class="label">Offer Reference ID:</span> <span class="value" style="color: #38bdf8;">${code}</span></div>
          <div class="details-row"><span class="label">Internship Track:</span> <span class="value">${trackTitle}</span></div>
          <div class="details-row"><span class="label">Duration:</span> <span class="value">${duration || '4 - 8 Weeks'}</span></div>
          <div class="details-row"><span class="label">Stipend / Model:</span> <span class="value" style="color: #34d399;">${stipend || 'Performance Based'}</span></div>
          <div class="details-row"><span class="label">Mode:</span> <span class="value">100% Online & Self-Paced Virtual Internship</span></div>
        </div>

        <div class="body-text" style="text-align: center;">
          Please log in to your Student Dashboard to view your official Offer Letter document, guidelines, and begin your assigned project tasks.
        </div>

        <div class="btn-wrapper">
          <a href="${loginUrl}" class="cta-btn">View Offer Letter on Dashboard →</a>
        </div>

        <div class="footer">
          NDRise Technologies | ISO 9001:2015 Certified Virtual Internship Platform<br/>
          This is an official offer letter notification email sent to ${studentEmail}.
        </div>
      </div>
    </body>
    </html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"NDRise Technologies" <${process.env.SMTP_USER}>`,
        to: studentEmail,
        subject: `🎉 Official Internship Offer Letter — NDRise Technologies (${trackTitle})`,
        html: htmlContent
      });
      console.log(`[EMAIL SERVICE] Offer Letter sent successfully to ${studentEmail}`);
    } catch (err) {
      console.error('[EMAIL SERVICE] Transporter offer letter error:', err.message);
    }
  } else {
    console.log(`\n=============================================================`);
    console.log(`[EMAIL SERVICE DEV LOG - OFFER LETTER] (No SMTP set in .env)`);
    console.log(`TO: ${studentEmail}`);
    console.log(`OFFER CODE: ${code}`);
    console.log(`SUBJECT: 🎉 Official Internship Offer Letter — NDRise Technologies (${trackTitle})`);
    console.log(`ACTION LINK: ${loginUrl}`);
    console.log(`=============================================================\n`);
  }

  return code;
};

module.exports = {
  sendCertificateNotificationEmail,
  sendOfferLetterEmail
};
