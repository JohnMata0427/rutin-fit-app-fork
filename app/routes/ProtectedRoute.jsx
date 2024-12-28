import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { Login } from '@/screens/auth/Login';

export function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Login />;
  }

  return children;
}