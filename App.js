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

const Stack = createNativeStackNavigator();

export default function App() {
  const [logeado, setLogeado] = useState(null);
  const [inicializacion, setInicializacion] = useState(true);
  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth-token");
        console.log("Token encontrado: ",token);
        setLogeado(!!token);
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
          initialRouteName={logeado ? "Main" : "Main"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="OlvidarPassword" component={OlvidarPassword} />
          <Stack.Screen name="Datos" component={Datos} />
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
