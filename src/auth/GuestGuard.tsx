import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_AFTER_LOGIN } from 'src/config';
import LoadingScreen from '../components/LoadingScreen';
import { useAuthContext } from './useAuthContext';

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={PATH_AFTER_LOGIN} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
