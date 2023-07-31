import { useAuthContext } from './useAuthContext';

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({
  hasContent,
  roles,
  children,
}: RoleBasedGuardProp) {
  const { user } = useAuthContext();

  const currentRole = user?.role!;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <div style={{ textAlign: 'center' }}>
        <h1>אין לך הרשאה</h1>
      </div>
    ) : null;
  }

  return <>{children}</>;
}
