import axios from 'axios';
import { API_BASE_URL, API_PROTOCOL } from '../config';
import { authMiddleWare } from './authMiddleware';

const baseURL = `${API_PROTOCOL}://${API_BASE_URL}`;

const createAxiosInstance = () => {
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
      Promise.reject(
        (error.response && error.response.data) ||
          (error.message && error.message) ||
          'Something went wrong'
      )
  );

  return axiosInstance;
};

export const privateAxios = createAxiosInstance();

export const publicAxios = createAxiosInstance();

privateAxios.interceptors.request.use(authMiddleWare);
