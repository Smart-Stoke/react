import { ENDPOINTS } from 'src/api/endpoints';
import { publicAxios } from '../utils/axios';

export const refreshTokenApi = (refreshToken: string): Promise<any> =>
  publicAxios
    .post(ENDPOINTS.refreshToken, { refreshToken })
    .then((res) => res.data);
