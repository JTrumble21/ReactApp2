export function saveAuth(token, role, name) {
  localStorage.setItem('apiToken', token);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userName', name || '');
}

export function clearAuth() {
  localStorage.removeItem('apiToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
}

export function getToken() {
  return localStorage.getItem('apiToken');
}

export function getRole() {
  return localStorage.getItem('userRole') || null;
}

export function isLoggedIn() {
  return !!getToken();
}

export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
