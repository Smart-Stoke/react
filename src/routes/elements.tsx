import { Suspense, lazy, ElementType } from 'react';
import LoadingScreen from 'src/components/LoadingScreen';

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const DashboardPage = Loadable(
  lazy(() => import('../pages/DashboardPage'))
);
