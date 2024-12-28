import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { TabNavigator } from '@/layouts/TabNavigator'

export function PublicRoute({ children }) {
  const { auth } = useContext(AuthContext);

  return auth ? <TabNavigator /> : children
}
