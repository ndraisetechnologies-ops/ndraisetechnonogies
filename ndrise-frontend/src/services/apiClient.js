const API_BASE_URL = '/api';

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
  getMyApplications: () => request('/applications/my', { method: 'GET' })
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
