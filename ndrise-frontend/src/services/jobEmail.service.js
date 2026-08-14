// Job Email Builder Generator Service & Quality Auditor

export const EMAIL_TYPES = [
  {
    id: 'internship-app',
    title: 'Internship Application',
    description: 'Reach out to a company with a professional internship application.',
    iconName: 'Briefcase'
  },
  {
    id: 'job-app',
    title: 'Job Application',
    description: 'Apply for a full-time or part-time job role with impact.',
    iconName: 'Building'
  },
  {
    id: 'recruiter-outreach',
    title: 'Recruiter Outreach',
    description: 'Reach out directly to a recruiter or hiring manager.',
    iconName: 'UserCheck'
  },
  {
    id: 'follow-up',
    title: 'Follow-Up Email',
    description: 'Follow up on an existing application or recent interview.',
    iconName: 'Clock'
  },
  {
    id: 'thank-you',
    title: 'Thank-You Email',
    description: 'Send a thoughtful, professional post-interview thank you email.',
    iconName: 'Heart'
  },
  {
    id: 'networking',
    title: 'Networking Email',
    description: 'Connect with an industry professional for career guidance.',
    iconName: 'Users'
  },
  {
    id: 'referral-request',
    title: 'Referral Request',
    description: 'Ask an employee or professional contact for an internal job referral.',
    iconName: 'Share2'
  }
];

export const TONE_OPTIONS = ['Professional', 'Friendly', 'Confident', 'Concise'];
export const LENGTH_OPTIONS = ['Short', 'Medium', 'Detailed'];

export function generateJobEmail(formData) {
  const {
    emailType = 'internship-app',
    tone = 'Professional',
    length = 'Medium',
    fullName = 'Rajan',
    email = 'rajan@example.com',
    phone = '+91 9876543210',
    college = 'NDRise Academy of Technology',
    course = 'B.Tech in Computer Science',
    skills = 'React, JavaScript, HTML5, CSS3, REST APIs',
    recipientName = 'Hiring Manager',
    companyName = 'NDRise Technologies',
    recipientEmail = 'hr@ndrise.com',
    jobTitle = 'Frontend Developer Intern',
    jobDescription = '',
    whyInterested = '',
    experience = '',
    portfolioUrl = 'https://rajan-portfolio.vercel.app',
    linkedinUrl = 'https://linkedin.com/in/rajan-dev',
    githubUrl = 'https://github.com/rajan-dev'
  } = formData;

  const recipientGreeting = recipientName ? `Dear ${recipientName},` : 'Dear Hiring Manager,';
  const myName = fullName || 'Rajan';
  const targetCompany = companyName || 'your company';
  const targetRole = jobTitle || 'the position';

  let subject = '';
  let body = '';

  const isShort = length === 'Short';
  const isDetailed = length === 'Detailed';

  switch (emailType) {
    case 'internship-app':
      subject = `Application for ${targetRole} — ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `I am writing to express my enthusiastic interest in the ${targetRole} position at ${targetCompany}.\n\n` +
        `I am currently pursuing my ${course || 'Degree'} at ${college || 'University'}. ` +
        `Through my coursework and hands-on projects, I have developed strong skills in ${skills || 'frontend development and modern web technologies'}.\n\n` +
        (whyInterested ? `What excites me most about ${targetCompany} is ${whyInterested}.\n\n` : '') +
        (isDetailed && jobDescription ? `Having reviewed the role requirements (${jobDescription.slice(0, 100)}...), I am confident my background aligns well with your team's goals.\n\n` : '') +
        (!isShort ? `I would welcome the opportunity to discuss how my technical skills and eagerness to learn can contribute to ${targetCompany}.\n\n` : '') +
        `Thank you for your time and consideration.\n\n` +
        `Best regards,\n` +
        `${myName}\n` +
        `${email} | ${phone}\n` +
        `${linkedinUrl ? `LinkedIn: ${linkedinUrl}\n` : ''}` +
        `${githubUrl ? `GitHub: ${githubUrl}\n` : ''}` +
        `${portfolioUrl ? `Portfolio: ${portfolioUrl}` : ''}`;
      break;

    case 'job-app':
      subject = `Application for ${targetRole} Role — ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `I am writing to apply for the ${targetRole} position at ${targetCompany}.\n\n` +
        `With a background in ${course || 'Software Development'} and practical proficiency in ${skills || 'core engineering principles'}, ` +
        `I have built several production-ready applications that focus on performance, responsive design, and user satisfaction.\n\n` +
        (whyInterested ? `I am particularly drawn to ${targetCompany} because ${whyInterested}.\n\n` : '') +
        (!isShort ? `I am eager to leverage my technical problem-solving abilities to deliver immediate value to your team.\n\n` : '') +
        `Thank you for considering my application. I look forward to the possibility of an interview.\n\n` +
        `Sincerely,\n` +
        `${myName}\n` +
        `${email} | ${phone}\n` +
        `${linkedinUrl ? `LinkedIn: ${linkedinUrl}\n` : ''}` +
        `${portfolioUrl ? `Portfolio: ${portfolioUrl}` : ''}`;
      break;

    case 'recruiter-outreach':
      subject = `Exploring ${targetRole} Opportunities at ${targetCompany} — ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `I hope this email finds you well.\n\n` +
        `My name is ${myName}, and I am a ${course || 'Computer Science student'} at ${college || 'University'}. ` +
        `I have been following ${targetCompany}'s recent developments with great interest and am very interested in upcoming ${targetRole} opportunities.\n\n` +
        `My core skillset includes ${skills || 'modern software technologies'}. I have attached my resume and would love to connect briefly if you have 5 minutes to discuss potential fits.\n\n` +
        `Thank you for your time and guidance.\n\n` +
        `Best regards,\n` +
        `${myName}\n` +
        `${email} | ${phone}\n` +
        `${linkedinUrl ? `LinkedIn: ${linkedinUrl}` : ''}`;
      break;

    case 'follow-up':
      subject = `Following Up: Application for ${targetRole} — ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `I hope you are having a great week.\n\n` +
        `I am writing to respectfully follow up on my recent application for the ${targetRole} position at ${targetCompany}.\n\n` +
        `I remain very enthusiastic about the opportunity to join ${targetCompany} and contribute my skills in ${skills || 'software development'}.\n\n` +
        `Please let me know if there are any additional details or references I can provide. I appreciate your time and consideration.\n\n` +
        `Warm regards,\n` +
        `${myName}\n` +
        `${email} | ${phone}`;
      break;

    case 'thank-you':
      subject = `Thank You — ${targetRole} Interview | ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `Thank you so much for taking the time to speak with me today regarding the ${targetRole} position at ${targetCompany}.\n\n` +
        `I thoroughly enjoyed learning more about the team culture and upcoming projects. Our discussion further confirmed my excitement about contributing to ${targetCompany}.\n\n` +
        `Please feel free to reach out if you need any further information. I look forward to hearing about the next steps.\n\n` +
        `Best regards,\n` +
        `${myName}\n` +
        `${email} | ${phone}`;
      break;

    case 'networking':
      subject = `Seeking Advice from a Fellow Professional at ${targetCompany}`;
      body = `${recipientGreeting}\n\n` +
        `My name is ${myName}, currently pursuing ${course || 'Computer Science'} at ${college || 'University'}.\n\n` +
        `I came across your profile and admire your work at ${targetCompany}. As an aspiring ${targetRole || 'Developer'}, I would be deeply grateful for 10-15 minutes of your time for a virtual coffee chat to learn about your career journey and advice for breaking into the field.\n\n` +
        `I understand you are very busy, so any brief insights would mean a lot to me.\n\n` +
        `Thank you for your time!\n\n` +
        `Best regards,\n` +
        `${myName}\n` +
        `${email}\n` +
        `${linkedinUrl ? `LinkedIn: ${linkedinUrl}` : ''}`;
      break;

    case 'referral-request':
      subject = `Referral Inquiry for ${targetRole} at ${targetCompany} — ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `I hope you are doing well.\n\n` +
        `I noticed that ${targetCompany} is currently hiring for a ${targetRole}. Given your experience at ${targetCompany}, I wanted to reach out to see if you might be open to submitting an internal referral for my application.\n\n` +
        `I have strong practical experience in ${skills || 'software engineering'} and have attached my resume for your review. I would be glad to share any additional details about my background.\n\n` +
        `Thank you so much for considering this request!\n\n` +
        `Warm regards,\n` +
        `${myName}\n` +
        `${email} | ${phone}\n` +
        `${portfolioUrl ? `Portfolio: ${portfolioUrl}` : ''}`;
      break;

    default:
      subject = `Inquiry Regarding ${targetRole} — ${myName}`;
      body = `${recipientGreeting}\n\n` +
        `I am writing to get in touch regarding opportunities at ${targetCompany}.\n\n` +
        `Best regards,\n${myName}`;
  }

  // Adjust tone nuances if friendly or confident
  if (tone === 'Friendly') {
    body = body.replace('Dear Hiring Manager,', 'Hi Hiring Manager,')
               .replace('Sincerely,', 'Warmly,')
               .replace('Best regards,', 'Best,');
  } else if (tone === 'Confident') {
    body = body.replace('I am eager to leverage', 'I am ready to immediately drive results with')
               .replace('eagerness to learn', 'proven technical capabilities');
  } else if (tone === 'Concise') {
    // Trim extra spaces
    body = body.replace(/\n\n+/g, '\n\n');
  }

  const qualityAudit = calculateEmailQuality(subject, body, formData);

  return {
    subject,
    body,
    qualityScore: qualityAudit.score,
    checklist: qualityAudit.checklist,
    suggestions: qualityAudit.suggestions
  };
}

export function calculateEmailQuality(subject, body, formData) {
  let score = 86;
  const checklist = [
    { label: 'Professional tone', status: true },
    { label: 'Clear subject line', status: !!subject },
    { label: 'Personalized greeting & details', status: !!(formData.recipientName || formData.companyName) },
    { label: 'Concise & structured paragraphs', status: body.length < 1500 }
  ];

  const suggestions = [];

  if (!formData.companyName) {
    score -= 8;
    checklist.push({ label: 'Specify company name', status: false });
    suggestions.push({ id: 1, text: 'Add company name for better personalization.', isWarning: true });
  } else {
    suggestions.push({ id: 1, text: `Personalized for ${formData.companyName}.`, isWarning: false });
  }

  if (!formData.whyInterested) {
    score -= 6;
    suggestions.push({ id: 2, text: 'Mention a specific reason why you are interested in this company.', isWarning: true });
  } else {
    suggestions.push({ id: 2, text: 'Clear motivation included.', isWarning: false });
  }

  if (formData.portfolioUrl || formData.githubUrl) {
    score += 5;
    suggestions.push({ id: 3, text: 'Portfolio / GitHub link included for recruiter verification.', isWarning: false });
  } else {
    suggestions.push({ id: 3, text: 'Consider adding a portfolio or GitHub URL.', isWarning: true });
  }

  score = Math.min(100, Math.max(50, score));

  return {
    score,
    checklist,
    suggestions
  };
}
