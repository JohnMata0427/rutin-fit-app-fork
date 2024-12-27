import './global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { verificateTokenNotifications } from '@/services/notifications';
import { AuthProvider } from '@/contexts/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import { TabNavigator } from '@/layouts/TabNavigator';
import { QuienesSomos } from '@/screens/QuienesSomos';
import { Login } from '@/screens/Login';
import { UpdateProfile } from '@/screens/UpdateProfile';

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
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
