import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { useProfile } from '@/models/useProfile';
import { addEventListener } from '@react-native-community/netinfo';

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
      const token = await AsyncStorage.getItem('@auth_token');

      let profile = {};
      try {
        profile = connected && (await handleProfile(token));
      } catch {
        const saved_profile = await AsyncStorage.getItem('@profile');
        profile = JSON.parse(saved_profile);
      }
      
      setAuth(profile);
      setToken(token);
    })();
  }, [connected]);

  return (
    <AuthContext.Provider value={{ auth, token, connected, setAuth, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
