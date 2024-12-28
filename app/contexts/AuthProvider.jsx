import { useProfile } from '@/models/useProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addEventListener } from '@react-native-community/netinfo';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { handleProfile } = useProfile();
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState('');
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    return () =>
      addEventListener(({ isConnected }) => setConnected(isConnected));
  }, []);

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem('@auth_token');
      setToken(savedToken);

      const profile = await handleProfile(token);
      setAuth(profile);
    })();
  }, [token]);

  return (
    <AuthContext.Provider value={{ auth, token, connected, setAuth, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
