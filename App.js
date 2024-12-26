import './global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { verificateTokenNotifications } from './app/services/notifications';
import { AuthProvider } from './app/contexts/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from './app/layouts/TabNavigator';
import { QuienesSomos } from './app/screens/QuienesSomos';
import { Login } from './app/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        if (token) {
          setToken(token);
          await verificateTokenNotifications(token);
        }
      } catch {}
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName={token ? 'Main' : 'Login'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="QuienesSomos" component={QuienesSomos} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
