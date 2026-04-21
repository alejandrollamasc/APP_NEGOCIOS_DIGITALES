const CREDENTIALS = {
  email: 'alejandro.llamas@segurosbolivar.com',
  password: 'Kiroman2026'
};

const AUTH_KEY = 'sb_admin_auth';

export function isAuthenticated() {
  try {
    const auth = JSON.parse(sessionStorage.getItem(AUTH_KEY));
    return auth && auth.authenticated === true;
  } catch {
    return false;
  }
}

export function getUser() {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
}

export function login(email, password) {
  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
    const session = {
      authenticated: true,
      email,
      name: 'Alejandro Llamas',
      loginTime: new Date().toISOString()
    };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true };
  }
  return { success: false, error: 'Credenciales incorrectas' };
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}
