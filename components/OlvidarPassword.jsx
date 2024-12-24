import {
  View,
  Image,
  ScrollView,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import { restaurarContraseña } from "../services/AuthService.js";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function OlvidarPassword({ navigation }) {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarCorreo = async () => {
    setLoading(true);
    // Validar que el correo ingresado sea correcto
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) || Object.values(email).includes("")) {
      Alert.alert("Error", "Por favor ingrese un correo válido");
      setLoading(false);
      return;
    } 
    try {
      const datos = await restaurarContraseña(email);
      if (datos) {
        Alert.alert(
          "Éxito",
          "Verifica tu correo electrónico para restablecer tu contraseña"
        );
        navigation.navigate("CodigoPassword", { email });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="w-full h-full flex-1 bg-white"
    >
      <Header />

      <ScrollView
        className=""
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            maxWidth: "70%",
            width: "70%",
            shadowColor: "#00ff82",
            elevation: 20,
            backgroundColor: "#fff",
          }}
          className="w-64 items-center gap-y-4 flex flex-col mb-5 rounded-2xl p-2"
        >
          <Image
            source={imagenes.loginIcon}
            className="min-w-[50px] min-h-[50px] h-28 w-28"
            style={{ resizeMode: "contain" }}
          />
          <Text className="font-extrabold text-xl text-center">
            Recuperar Contraseña
          </Text>
          <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
            <View className="flex-row items-center">
              <MaterialIcons name="email" size={24} color="black" />
              <Text className="ml-2 font-bold">Correo:</Text>
            </View>

            <TextInput
              placeholder="Ingrese su correo"
              className="border-b-2"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="flex-row w-full justify-evenly p-2">
            <TouchableOpacity
              style={{
                backgroundColor: "#82E5B5",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={enviarCorreo}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <View className="flex-row items-center">
                  <Text className="mr-2 font-bold">Enviar</Text>
                  <MaterialCommunityIcons
                    name="email-send"
                    size={20}
                    color="black"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                backgroundColor: "#82E5B5",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <View className="flex-row items-center">
                <Text className="mr-2 font-bold">Cancelar</Text>
                <MaterialCommunityIcons name="close" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
