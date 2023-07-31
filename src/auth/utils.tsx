import { privateAxios } from '../utils/axios';
import { AuthUser } from 'src/types/user.type';
import { STORAGE_KEYS } from 'src/config';

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const setSession = (user: AuthUser) => {
  const accessToken = user.tokens.access.token;
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  privateAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const removeSession = () => {
  localStorage.removeItem(STORAGE_KEYS.user);
  delete privateAxios.defaults.headers.common.Authorization;
};

export const getSession = (): AuthUser | null => {
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || 'null');
  return user;
};
