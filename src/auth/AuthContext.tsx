import { createContext, useEffect, useReducer, useCallback } from "react";

import { publicAxios } from "../utils/axios";
import { isValidToken, setSession, removeSession, getSession } from "./utils";
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  AuthContextType,
  MethodType,
} from "./types";
import { AuthUser } from "src/types/user.type";
import { PATH_AUTH } from "src/routes/paths";
import { ENDPOINTS } from "src/api/endpoints";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FIREBASE_API } from "src/config";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
    method: MethodType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  method: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      method: action.payload.method,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const firebaseApp = initializeApp(FIREBASE_API);

  const AUTH = getAuth(firebaseApp);
  const GOOGLE_PROVIDER = new GoogleAuthProvider();

  const initialize = useCallback(async () => {
    try {
      const authUser: AuthUser | null = getSession();
      const accessToken = authUser?.tokens.access.token;
      const refreshToken = authUser?.tokens.refresh.token;
      if (
        (accessToken && isValidToken(accessToken)) ||
        (refreshToken && isValidToken(refreshToken))
      ) {
        setSession(authUser);

        const { user } = authUser;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
            method: "jwt",
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
            method: "jwt",
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
          method: "jwt",
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (email: string, password: string) => {
    const response = await publicAxios.post(ENDPOINTS.login, {
      email,
      password,
    });
    const authUser: AuthUser = response.data;
    setSession(authUser);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: authUser.user,
      },
    });
  };

  const loginWithGoogle = () => {
    signInWithPopup(AUTH, GOOGLE_PROVIDER);
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await publicAxios.post(ENDPOINTS.register, {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    const {
      tokens: {
        refresh: { token: refreshToken },
      },
    }: AuthUser = getSession()!;
    publicAxios
      .post(ENDPOINTS.logout, {
        refreshToken,
      })
      .then();
    removeSession();
    dispatch({
      type: Types.LOGOUT,
    });
    window.location.href = PATH_AUTH.login;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
