const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api';

export const getAuthToken = () => localStorage.getItem('auth_token');
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const authAPI = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  adminLogin: (payload) => request('/auth/admin-login', { method: 'POST', body: JSON.stringify(payload) }),
  forgotPassword: (payload) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) }),
  resetPassword: (payload) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
  googleAuth: (payload) => request('/auth/google', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => request('/auth/me', { method: 'GET' }),
  logout: () => request('/auth/logout', { method: 'POST' })
};

export const internshipAPI = {
  getInternships: () => request('/internships', { method: 'GET' }),
  apply: (payload) => request('/applications', { method: 'POST', body: JSON.stringify(payload) }),
  getMyApplications: () => request('/applications/my', { method: 'GET' }),
  createInternship: (payload) => request('/admin/internships', { method: 'POST', body: JSON.stringify(payload) }),
  deleteInternship: (id) => request(`/admin/internships/${id}`, { method: 'DELETE' }),
  sendOfferLetter: (payload) => request('/admin/offer-letters/send', { method: 'POST', body: JSON.stringify(payload) })
};

export const submissionAPI = {
  submitProject: (payload) => request('/submissions', { method: 'POST', body: JSON.stringify(payload) }),
  getMySubmissions: () => request('/submissions/my', { method: 'GET' }),
  getAllSubmissions: () => request('/admin/submissions', { method: 'GET' }),
  updateSubmissionStatus: (id, status, adminFeedback) => request(`/admin/submissions/${id}/status`, { 
    method: 'PATCH', 
    body: JSON.stringify({ status, adminFeedback }) 
  })
};

export const studentAPI = {
  getDashboardMetrics: () => request('/student/dashboard', { method: 'GET' })
};

export const certificateAPI = {
  claimCertificate: (payload) => request('/certificates/claim', { method: 'POST', body: JSON.stringify(payload) }),
  getMyCertificates: () => request('/certificates/my', { method: 'GET' }),
  getAllCertificates: () => request('/admin/certificates', { method: 'GET' })
};

export const careerAPI = {
  analyzeATS: (payload) => request('/career/ats-score', { method: 'POST', body: JSON.stringify(payload) }),
  generateEmail: (payload) => request('/career/job-email', { method: 'POST', body: JSON.stringify(payload) }),
  generateInterviewPrep: (payload) => request('/career/interview-prep', { method: 'POST', body: JSON.stringify(payload) }),
  searchJobs: (payload) => request('/career/job-search', { method: 'POST', body: JSON.stringify(payload) })
};
