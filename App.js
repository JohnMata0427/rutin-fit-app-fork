import { AuthProvider } from '@/contexts/AuthProvider';
import { TabNavigator } from '@/layouts/TabNavigator';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { ClientData } from '@/screens/auth/ClientData';
import { ForgotPassword } from '@/screens/auth/ForgotPassword';
import { Login } from '@/screens/auth/Login';
import { NewPassword } from '@/screens/auth/NewPassword';
import { QuienesSomos } from '@/screens/auth/QuienesSomos';
import { Register } from '@/screens/auth/Register';
import { UpdateProfile } from '@/screens/UpdateProfile';
import { registerPushNotifications } from '@/services/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem('@auth_token');
      if (savedToken) {
        setToken(savedToken);
        await registerPushNotifications(savedToken);
      }
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
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ClientData" component={ClientData} />

            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword} />

            <Stack.Screen name="QuienesSomos" component={QuienesSomos} />

            <Stack.Screen name="Main">
              {() => (
                <ProtectedRoute>
                  <TabNavigator />
                </ProtectedRoute>
              )}
            </Stack.Screen>

            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
