import {
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
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
import { cambiarContraseña } from "../services/AuthService.js";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function NuevaContraseña({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const { email } = route.params;

  const [contraseña, setContraseña] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const updatePassword = async () => {
    try {
      setLoading(true);
      // Validar que las contraseñas sean iguales, mayor a 8 un caracter especial y un numero
      if (contraseña.password !== contraseña.confirmPassword) {
        Alert.alert("Error", "Las contraseñas deben ser iguales");
      } else if (contraseña.password.length < 8) {
        Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      } else if (
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(contraseña.password)
      ) {
        Alert.alert(
          "Error",
          "La contraseña debe tener al menos un caracter especial"
        );
      } else if (!/[0-9]/.test(contraseña.password)) {
        Alert.alert("Error", "La contraseña debe tener al menos un número");
      } else if (!/[A-Z]/.test(contraseña.password)) {
        Alert.alert("Error", "La contraseña debe tener al menos una mayúscula");
      } else {
        const datos = await cambiarContraseña(
          email,
          contraseña.password,
          contraseña.confirmPassword
        );
        if (datos) {
          navigation.navigate("Login");
        } else {
          Alert.alert("Error", "No se pudo cambiar la contraseña");
        }
      }
    } catch (error) {
      console.log(error);
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
          className="w-64 items-center gap-y-2 flex flex-col mb-5 p-2"
        >
          <Image
            source={imagenes.loginIcon}
            className="min-w-[50px] min-h-[50px] h-28 w-28"
            style={{ resizeMode: "contain" }}
          />
          <Text className="font-extrabold text-xl text-center">
            Ingres tu nueva contraseña
          </Text>
          <View style={{ maxWidth: "80%" }} className="w-full gap-y-3 p-2">
            <Text className="text-center border-l-2 border-[#82E5B5]"> La contraseña debe tener al menos 8 caracteres </Text>
            <Text className="text-center border-l-2 border-[#82E5B5]"> La contraseña debe tener al menos un caracter especial </Text>
            <Text className="text-center border-l-2 border-[#82E5B5]"> La contraseña debe tener al menos un número </Text>
            <Text className="text-center border-l-2 border-[#82E5B5]"> La contraseña debe tener al menos una mayúscula </Text>
          </View>
          <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
            <View className="flex-row items-center">
              <MaterialIcons name="lock" size={24} color="black" />
              <Text className="ml-2 font-bold">Nueva contraseña:</Text>
            </View>
            <TextInput
              placeholder="Ingrese su correo"
              className="border-b-2"
              value={contraseña.password}
              onChangeText={(text) =>
                setContraseña({ ...contraseña, password: text })
              }
            />
          </View>
          <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
            <View className="flex-row items-center">
              <MaterialIcons name="lock" size={24} color="black" />
              <Text className="ml-2 font-bold">
                Confirmar nueva contraseña:
              </Text>
            </View>
            <TextInput
              placeholder="Ingrese su correo"
              className="border-b-2"
              value={contraseña.confirmPassword}
              onChangeText={(text) =>
                setContraseña({ ...contraseña, confirmPassword: text })
              }
            />
          </View>
          <View className="flex-row w-full justify-evenly">
            <TouchableOpacity
              style={{
                backgroundColor: "#82E5B5",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={updatePassword}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <View className="flex-row items-center">
                  <Text className="mr-2 font-bold">Enviar</Text>
                  <MaterialCommunityIcons
                    name="send-check"
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
