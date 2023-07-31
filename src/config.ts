import { PATH_DASHBOARD } from './routes/paths';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
export const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL || '';

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const PATH_AFTER_LOGIN = PATH_DASHBOARD.root;

export const STORAGE_KEYS = {
  user: 'user',
};
