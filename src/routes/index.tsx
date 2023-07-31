import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthGuard from 'src/auth/AuthGuard';
import GuestGuard from 'src/auth/GuestGuard';
import { PATH_AFTER_LOGIN } from 'src/config';
import { LoginPage, DashboardPage } from './elements';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={PATH_AFTER_LOGIN} /> },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    ),
  },
  {
    path: '404',
    element: <h1>404</h1>,
  },
  { path: '*', element: <Navigate to='/404' replace /> },
]);

export default router;
