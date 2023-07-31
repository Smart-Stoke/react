import { InternalAxiosRequestConfig } from 'axios';

import { getSession, jwtDecode, setSession } from '../auth/utils';
import { refreshTokenApi } from 'src/services/refresh-token.service';
import { Tokens } from 'src/types/user.type';

export const authMiddleWare = async (
  config: InternalAxiosRequestConfig<any>
) => {
  try {
    const authUser = getSession();
    const accessToken = authUser?.tokens?.access?.token;
    const refreshToken = authUser?.tokens?.refresh?.token;

    if (accessToken && refreshToken) {
      const decodedToken: { exp: number } = jwtDecode(accessToken);
      const currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          const tokens: Tokens = await refreshTokenApi(refreshToken);
          authUser.tokens = tokens;
          setSession(authUser);
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${authUser.tokens.access.token}`;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return config;
  } catch (error) {
    return config;
  }
};
