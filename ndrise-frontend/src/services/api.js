const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Ensures HttpOnly cookies are automatically attached
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: data.error || `Request failed with status ${response.status}`,
      };
    }

    return data;
  } catch (err) {
    return {
      success: false,
      status: 0,
      error: 'Network error or server unreachable',
    };
  }
}

export const authApi = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  adminLogin: (email, password) =>
    request('/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getMe: () => request('/auth/me'),

  logout: () => request('/auth/logout', { method: 'POST' }),
};

export const adminApi = {
  getDashboard: () => request('/admin/dashboard'),
  getStudents: (search = '', startDate = '', endDate = '') => 
    request(`/admin/students?search=${encodeURIComponent(search)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
  deleteStudent: (id) => request(`/admin/students/${id}`, { method: 'DELETE' }),
  getInternships: () => request('/admin/internships'),
  createInternship: (data) => request('/admin/internships', { method: 'POST', body: JSON.stringify(data) }),
  getApplications: () => request('/admin/applications'),
  updateApplicationStatus: (id, status) =>
    request(`/admin/applications/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getCertificates: () => request('/admin/certificates'),
  issueCertificate: (userId, internshipTitle) =>
    request('/admin/certificates', { method: 'POST', body: JSON.stringify({ userId, internshipTitle }) }),
  getUsers: () => request('/admin/users'),
  updateUserRole: (id, newRole) =>
    request(`/admin/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ newRole }) }),
  getAuditLogs: () => request('/admin/audit-logs'),
  getSettings: () => request('/admin/settings'),
  updateSettings: (settings) => request('/admin/settings', { method: 'PUT', body: JSON.stringify(settings) }),
};

export const studentApi = {
  getProfile: (userId) => request(`/students/${userId}`),
  getApplications: (userId) => request(`/students/${userId}/applications`),
  getCertificates: (userId) => request(`/students/${userId}/certificates`),
};
