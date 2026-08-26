// Comprehensive Admin Dashboard Mock & Seed Data for NDRise Technologies SaaS Platform

export const initialPaymentsData = [
  {
    id: 'PAY-9001',
    txnId: 'TXN_RZP_88192031',
    orderId: 'ORD_NDR_77192',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@example.com',
    trackTitle: 'Full Stack Web Development',
    amount: '₹99',
    status: 'SUCCESS',
    paymentMethod: 'UPI / GPay',
    paidAt: '2026-08-18T14:32:00Z',
    receiptUrl: '#'
  },
  {
    id: 'PAY-9002',
    txnId: 'TXN_RZP_88192032',
    orderId: 'ORD_NDR_77193',
    studentName: 'Priya Patel',
    studentEmail: 'priya.patel@example.com',
    trackTitle: 'Frontend Web Development',
    amount: '₹99',
    status: 'SUCCESS',
    paymentMethod: 'Razorpay Card',
    paidAt: '2026-08-18T16:45:00Z',
    receiptUrl: '#'
  },
  {
    id: 'PAY-9003',
    txnId: 'TXN_RZP_88192033',
    orderId: 'ORD_NDR_77194',
    studentName: 'Ananya Verma',
    studentEmail: 'ananya.verma@example.com',
    trackTitle: 'Artificial Intelligence & Machine Learning',
    amount: '₹99',
    status: 'SUCCESS',
    paymentMethod: 'PhonePe UPI',
    paidAt: '2026-08-18T18:10:00Z',
    receiptUrl: '#'
  },
  {
    id: 'PAY-9004',
    txnId: 'TXN_RZP_88192034',
    orderId: 'ORD_NDR_77195',
    studentName: 'Vikram Singh',
    studentEmail: 'vikram.singh@example.com',
    trackTitle: 'Python Software Development',
    amount: '₹99',
    status: 'PENDING',
    paymentMethod: 'Net Banking',
    paidAt: '2026-08-19T09:15:00Z',
    receiptUrl: '#'
  },
  {
    id: 'PAY-9005',
    txnId: 'TXN_RZP_88192035',
    orderId: 'ORD_NDR_77196',
    studentName: 'Neha Gupta',
    studentEmail: 'neha.gupta@example.com',
    trackTitle: 'Cloud Engineering & DevOps',
    amount: '₹99',
    status: 'SUCCESS',
    paymentMethod: 'Paytm UPI',
    paidAt: '2026-08-19T10:20:00Z',
    receiptUrl: '#'
  }
];

export const initialOfferLettersData = [
  {
    id: 'OFF-101',
    offerCode: 'NDR-OFF-2026-891',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@example.com',
    trackTitle: 'Full Stack Web Development',
    issuedDate: '2026-08-10',
    duration: '4 Weeks',
    status: 'SENT',
    downloadUrl: '#'
  },
  {
    id: 'OFF-102',
    offerCode: 'NDR-OFF-2026-892',
    studentName: 'Priya Patel',
    studentEmail: 'priya.patel@example.com',
    trackTitle: 'Frontend Web Development',
    issuedDate: '2026-08-12',
    duration: '4 Weeks',
    status: 'SENT',
    downloadUrl: '#'
  },
  {
    id: 'OFF-103',
    offerCode: 'NDR-OFF-2026-893',
    studentName: 'Aarav Gupta',
    studentEmail: 'aarav.gupta@example.com',
    trackTitle: 'Python Software Development',
    issuedDate: '2026-08-14',
    duration: '4 Weeks',
    status: 'SENT',
    downloadUrl: '#'
  },
  {
    id: 'OFF-104',
    offerCode: 'NDR-OFF-2026-894',
    studentName: 'Ananya Verma',
    studentEmail: 'ananya.verma@example.com',
    trackTitle: 'Artificial Intelligence & Machine Learning',
    issuedDate: '2026-08-15',
    duration: '8 Weeks',
    status: 'SENT',
    downloadUrl: '#'
  }
];

export const initialProjectsCatalog = [
  {
    id: 'PRJ-01',
    trackTitle: 'Full Stack Web Development',
    domain: 'Web Development',
    taskNumber: 1,
    title: 'Personal Developer Portfolio & Responsive UI',
    level: 'Beginner',
    submissionType: 'GitHub + Live Vercel/Netlify URL',
    description: 'Build a modern personal portfolio with HTML5, CSS3/Tailwind, and JavaScript showcasing projects, skills, and contact form.'
  },
  {
    id: 'PRJ-02',
    trackTitle: 'Full Stack Web Development',
    domain: 'Web Development',
    taskNumber: 2,
    title: 'E-Commerce Storefront with Shopping Cart',
    level: 'Intermediate',
    submissionType: 'GitHub Repository + Demo Video',
    description: 'Implement a full-featured e-commerce UI with product filtering, cart state management, and checkout modal.'
  },
  {
    id: 'PRJ-03',
    trackTitle: 'Full Stack Web Development',
    domain: 'Web Development',
    taskNumber: 3,
    title: 'Full Stack SaaS Admin Dashboard with REST API',
    level: 'Advanced / Capstone',
    submissionType: 'GitHub + Live Deployed URL',
    description: 'Design and deploy a complete production-grade admin dashboard with authentication, database integration, and analytics.'
  },
  {
    id: 'PRJ-04',
    trackTitle: 'Frontend Web Development',
    domain: 'Frontend Engineering',
    taskNumber: 1,
    title: 'Interactive Weather Web App',
    level: 'Beginner',
    submissionType: 'GitHub Repository',
    description: 'Develop a responsive weather application consuming OpenWeather REST API with search, geolocation, and temperature forecast charts.'
  },
  {
    id: 'PRJ-05',
    trackTitle: 'Artificial Intelligence & Machine Learning',
    domain: 'Data & AI',
    taskNumber: 1,
    title: 'Customer Churn Prediction Model using Scikit-Learn',
    level: 'Intermediate',
    submissionType: 'Jupyter Notebook / GitHub Repository',
    description: 'Train logistic regression and random forest models to predict subscriber churn with ROC-AUC evaluation curves.'
  }
];

export const initialSupportTicketsData = [
  {
    id: 'TCK-801',
    ticketNumber: '#TCK-8012',
    studentName: 'Sneha Reddy',
    studentEmail: 'sneha.reddy@example.com',
    subject: 'Need help verifying ₹99 certificate payment receipt',
    category: 'Certificate Payment',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: '2026-08-19T08:30:00Z',
    assignedTo: 'Support Desk Agent',
    messages: [
      { sender: 'student', text: 'Hi, I paid ₹99 via PhonePe UPI for my Full Stack Web Dev certificate but haven\'t received the verification email yet.', timestamp: '08:30 AM' }
    ]
  },
  {
    id: 'TCK-802',
    ticketNumber: '#TCK-8013',
    studentName: 'Rohan Kumar',
    studentEmail: 'rohan.kumar@example.com',
    subject: 'Query regarding Project Task 3 guidelines link',
    category: 'Task Query',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdAt: '2026-08-19T09:10:00Z',
    assignedTo: 'Lead Reviewer',
    messages: [
      { sender: 'student', text: 'Hello, the GitHub template link for Task 3 in Python track seems to require repository permissions.', timestamp: '09:10 AM' },
      { sender: 'admin', text: 'Hi Rohan! We have updated the repository access permissions to public. Please refresh your page.', timestamp: '09:25 AM' }
    ]
  },
  {
    id: 'TCK-803',
    ticketNumber: '#TCK-8014',
    studentName: 'Meera Nair',
    studentEmail: 'meera.nair@example.com',
    subject: 'Request to update name spelling on Official Offer Letter',
    category: 'Offer Letter',
    priority: 'LOW',
    status: 'RESOLVED',
    createdAt: '2026-08-18T14:00:00Z',
    assignedTo: 'Admin Support',
    messages: [
      { sender: 'student', text: 'Please update my surname spelling on my offer letter from Nayer to Nair.', timestamp: '02:00 PM' },
      { sender: 'admin', text: 'Updated! Your corrected offer letter has been re-generated and sent to your email.', timestamp: '03:15 PM' }
    ]
  }
];

export const initialEmailLogsData = [
  {
    id: 'EML-501',
    recipient: 'rahul.sharma@example.com',
    subject: 'Official Offer Letter - NDRise Virtual Internship',
    type: 'OFFER_LETTER',
    status: 'DELIVERED',
    sentAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'EML-502',
    recipient: 'priya.patel@example.com',
    subject: 'Project Submission Approved - Task 2 Verified',
    type: 'TASK_APPROVAL',
    status: 'DELIVERED',
    sentAt: '2026-08-15T12:30:00Z'
  },
  {
    id: 'EML-503',
    recipient: 'ananya.verma@example.com',
    subject: 'Congratulations! Your NDRise Certificate is Ready',
    type: 'CERTIFICATE_ISSUED',
    status: 'DELIVERED',
    sentAt: '2026-08-18T18:12:00Z'
  },
  {
    id: 'EML-504',
    recipient: 'vikram.singh@example.com',
    subject: '₹99 Payment Pending - NDRise Certificate Issuance',
    type: 'PAYMENT_REMINDER',
    status: 'QUEUED',
    sentAt: '2026-08-19T09:20:00Z'
  },
  {
    id: 'EML-505',
    recipient: 'sneha.reddy@example.com',
    subject: 'Welcome to NDRise Virtual Internship Program',
    type: 'WELCOME_EMAIL',
    status: 'DELIVERED',
    sentAt: '2026-08-19T14:15:00Z'
  },
  {
    id: 'EML-506',
    recipient: 'rohan.kumar@example.com',
    subject: 'Action Required: Update GitHub Submission Link',
    type: 'TASK_FEEDBACK',
    status: 'FAILED',
    sentAt: '2026-08-19T11:05:00Z'
  },
  {
    id: 'EML-507',
    recipient: 'meera.nair@example.com',
    subject: 'Official Offer Letter Re-issued - NDRise Tech',
    type: 'OFFER_LETTER',
    status: 'DELIVERED',
    sentAt: '2026-08-18T15:20:00Z'
  },
  {
    id: 'EML-508',
    recipient: 'amit.shah@example.com',
    subject: 'Certificate Verification Code & Badge',
    type: 'CERTIFICATE_ISSUED',
    status: 'DELIVERED',
    sentAt: '2026-08-14T08:45:00Z'
  }
];

export const initialReviewsData = [
  {
    id: 'REV-301',
    studentName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    domain: 'Full Stack Web Development',
    rating: 5,
    reviewText: 'The 4-week virtual internship gave me real-world hands-on project experience with React and Node.js. The ₹99 verified certificate added immense value to my resume!',
    status: 'PUBLISHED',
    date: '2026-08-15'
  },
  {
    id: 'REV-302',
    studentName: 'Priya Patel',
    email: 'priya.patel@example.com',
    domain: 'Frontend Web Development',
    rating: 5,
    reviewText: 'Great structured task guidelines! Evaluators provided detailed code review feedback. Highly recommend ND Raise Technologies to all engineering students.',
    status: 'PUBLISHED',
    date: '2026-08-16'
  },
  {
    id: 'REV-303',
    studentName: 'Ananya Verma',
    email: 'ananya.verma@example.com',
    domain: 'Artificial Intelligence & Machine Learning',
    rating: 4.8,
    reviewText: 'Worked on ML model training and deployment. Instant verification code check on the website makes it super easy to showcase to recruiters.',
    status: 'PUBLISHED',
    date: '2026-08-18'
  }
];

export const initialAdminUsersData = [
  {
    id: 'USR-001',
    name: 'NDRaise Super Admin',
    email: 'superadmin@ndraise.com',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    lastLogin: '2026-08-19 11:15 AM',
    permissions: 'Full Control'
  },
  {
    id: 'USR-002',
    name: 'NDRaise Administrator',
    email: 'admin@ndraise.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    lastLogin: '2026-08-19 10:45 AM',
    permissions: 'Operational Management'
  },
  {
    id: 'USR-003',
    name: 'Lead Technical Reviewer',
    email: 'reviewer@ndraise.com',
    role: 'REVIEWER',
    status: 'ACTIVE',
    lastLogin: '2026-08-19 09:30 AM',
    permissions: 'Project Evaluation & Feedback'
  },
  {
    id: 'USR-004',
    name: 'Student Support Desk',
    email: 'support@ndraise.com',
    role: 'SUPPORT',
    status: 'ACTIVE',
    lastLogin: '2026-08-19 11:00 AM',
    permissions: 'Helpdesk & Ticket Resolution'
  }
];

export const systemHealthMetrics = {
  dbStatus: 'CONNECTED (Neon PostgreSQL Cloud)',
  dbLatency: '14 ms',
  apiUptime: '99.98%',
  activeSessions: 42,
  paymentGatewayStatus: 'ONLINE (Razorpay & UPI)',
  emailDeliveryRate: '99.4%'
};

export const initialNotificationsData = [
  {
    id: 'NOTIF-101',
    title: 'New AI & Machine Learning Internship Track Launched!',
    type: 'ANNOUNCEMENT',
    targetAudience: 'All Registered Students',
    message: 'Explore our latest 8-week AI & ML track covering Scikit-Learn model training, NLP, and neural networks. Enroll now for free!',
    sentAt: '2026-08-19T14:30:00Z',
    sentBy: 'NDRaise Support Portal',
    reachCount: 12540
  },
  {
    id: 'NOTIF-102',
    title: 'Task 2 Submission Deadline Reminder',
    type: 'REMINDER',
    targetAudience: 'Active Internship Learners',
    message: 'Friendly reminder to all Full Stack and Frontend learners: Please submit your Task 2 GitHub link by Friday 11:59 PM.',
    sentAt: '2026-08-18T10:15:00Z',
    sentBy: 'Lead Reviewer',
    reachCount: 4120
  },
  {
    id: 'NOTIF-103',
    title: 'August Batch Official Offer Letters Dispatched',
    type: 'DOCUMENT_UPDATE',
    targetAudience: 'Active Internship Learners',
    message: 'Your official internship offer letters for the August batch have been generated and sent to your registered email address.',
    sentAt: '2026-08-15T09:00:00Z',
    sentBy: 'NDRaise Admin Desk',
    reachCount: 3890
  },
  {
    id: 'NOTIF-104',
    title: 'Platform Maintenance & System Upgrade Notice',
    type: 'URGENT_ALERT',
    targetAudience: 'All Registered Students',
    message: 'The NDRise dashboard will undergo scheduled database optimization tonight between 2:00 AM and 4:00 AM IST.',
    sentAt: '2026-08-10T18:00:00Z',
    sentBy: 'System Super Admin',
    reachCount: 12540
  }
];

export const analyticsChartData = {
  monthlyRegistrations: [
    { month: 'Jan', students: 840, completions: 520, revenue: 51480 },
    { month: 'Feb', students: 1120, completions: 780, revenue: 77220 },
    { month: 'Mar', students: 1450, completions: 940, revenue: 93060 },
    { month: 'Apr', students: 1890, completions: 1210, revenue: 119790 },
    { month: 'May', students: 2310, completions: 1540, revenue: 152460 },
    { month: 'Jun', students: 2840, completions: 1980, revenue: 196020 },
    { month: 'Jul', students: 3410, completions: 2350, revenue: 232650 },
    { month: 'Aug', students: 4120, completions: 2890, revenue: 286110 }
  ],
  trackDistribution: [
    { name: 'Full Stack Web', count: 4250, percentage: 34 },
    { name: 'Frontend Eng.', count: 2890, percentage: 23 },
    { name: 'AI & Data Science', count: 2340, percentage: 19 },
    { name: 'Python Dev', count: 1650, percentage: 13 },
    { name: 'Cloud & DevOps', count: 1410, percentage: 11 }
  ]
};
