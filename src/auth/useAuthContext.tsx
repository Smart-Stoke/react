import { useContext } from 'react';
import { AuthContextType } from './types';
import { AuthContext } from './AuthContext';

export const useAuthContext = () => {
  const context = useContext<AuthContextType | null>(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
