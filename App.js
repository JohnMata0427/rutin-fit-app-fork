import "./global.css"
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./components/Login";
import { Registro } from "./components/Registro";
import { OlvidarPassword } from "./components/OlvidarPassword";
import { Datos } from "./components/Datos";
import TabNavigator from "./TabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";
import { UpdateProfileScreen } from "./components/ActualizarPerfil"
import { CodigoPassword } from "./components/CodigoPassword";
import { NuevaContraseña } from "./components/NuevaContraseña";
import * as Notifications from 'expo-notifications';
import { tokenNotification } from "./services/AuthService";
import { QuienesSomos } from "./components/QuienesSomos";
const Stack = createNativeStackNavigator();

export default function App() {
  const [logeado, setLogeado] = useState(null);
  const [inicializacion, setInicializacion] = useState(true);

  const verificarTokenNotificacion = async (authToken) => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        console.log("No se otorgaron permisos de notificaciones");
        return;
      }
      const tokenNotificacion = (await Notifications.getExpoPushTokenAsync()).data;
      await tokenNotification(authToken ,tokenNotificacion); 
    } catch (error) {
      console.log("Error al obtener token de notificación: ", error);
    }
  }

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        setLogeado(!!token);
        if (token) {
          await verificarTokenNotificacion(token);
        }
      } catch (error) {
        console.log("Token inexistente o invalido: ", error);
        setLogeado(false);
      } finally {
        setInicializacion(false);
      }
    };
    verificarLogin();
  }, []);
  if (inicializacion) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando...</Text>
        </View>
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName={logeado ? "Main" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="OlvidarPassword" component={OlvidarPassword} />
          <Stack.Screen name="Datos" component={Datos} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
          <Stack.Screen name="CodigoPassword" component={CodigoPassword} />
          <Stack.Screen name="NuevaContraseña" component={NuevaContraseña} />
          <Stack.Screen name="QuienesSomos" component={QuienesSomos} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
