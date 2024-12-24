import {
  View,
  Image,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import ModalPersonalizado from "../layouts/Modal.jsx";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import { useLoginViewModel } from "../models/LoginViewModel.js";
import { PerfilViewModel } from "../models/PerfilVewModel.js";
import { registrarToken } from "../notifications.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export function Login({ navigation }) {
  const insets = useSafeAreaInsets();

  const { loading, modalVisible, setModalVisible, mensajesBack, handleLogin } =
    useLoginViewModel();

  const { handlePerfil } = PerfilViewModel();

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const manejarContraseñaVisible = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: "",
  });

  useFocusEffect(
    useCallback(() => {
      setDatosLogin({
        email: "",
        password: "",
      });
    }, [])
  );

  const handleLoginPress = async () => {
    const resultado = await handleLogin(datosLogin.email, datosLogin.password);
    if (resultado.success) {
      await registrarToken(resultado.datos.token);
      const perfil = await handlePerfil(resultado.datos.token);
      if (perfil?.success) {
        navigation.navigate("Main");
      } else {
        navigation.navigate("Datos");
      }
    }
  };

  return (
    <View
      style={{ paddingBottom: insets.bottom, flex: 1 }}
      className="w-full h-full flex-1 bg-white"
    >
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              maxWidth: "65%",
              shadowColor: "#00ff82",
              elevation: 20,
              backgroundColor: "#fff",
            }}
            className="items-center gap-y-4 my-5 mt-5 border-[#82E5B5] border- rounded-3xl"
          >
            <Image
              source={imagenes.loginIcon}
              className="min-w-[50px] min-h-[50px] h-28 w-28"
              style={{ resizeMode: "contain" }}
            />
            <Text className="font-extrabold text-4xl">Login</Text>
            <View style={{ maxWidth: "100%" }} className="gap-y-3">
              <View className="flex-row items-center">
                <FontAwesome name="user-circle" size={17} color="black" />
                <Text className="font-bold ml-2">Usuario:</Text>
              </View>
              <TextInput
                placeholder="Ingrese su usuario"
                className="border-b-2"
                value={datosLogin.email}
                onChangeText={(valor) =>
                  setDatosLogin({ ...datosLogin, email: valor })
                }
                autoCapitalize="none"
              />
              <View className="flex-row items-center">
                <MaterialIcons name="lock" size={20} color="black" />
                <Text className="font-bold ml-2">Contraseña:</Text>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  placeholder="Ingrese su contraseña"
                  className="border-b-2 mr-2"
                  secureTextEntry={!mostrarContraseña}
                  value={datosLogin.password}
                  onChangeText={(valor) =>
                    setDatosLogin({ ...datosLogin, password: valor })
                  }
                />
                <TouchableOpacity onPress={manejarContraseñaVisible}>
                  <Icon
                    name={mostrarContraseña ? "eye-off" : "eye"}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={{
                backgroundColor: "#82E5B5",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={handleLoginPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <View className="flex-row items-center">
                  <Text className="font-bold ml-2 mr-2">Iniciar Sesión</Text>
                  <AntDesign name="login" size={20} color="black" />
                </View>
              )}
            </Pressable>
            <ModalPersonalizado
              visible={modalVisible}
              onclose={() => setModalVisible(false)}
              titulo="Mensaje del sistema"
              mensajes={mensajesBack}
            />
            <View
              className="flex-wrap w-full m-2 justify-center items-center"
              style={{ maxWidth: "100%" }}
            >
              <View className="flex-row flex-wrap justify-center mb-2">
                <Text className="">¿Olvidaste tu contraseña? </Text>
                <Pressable
                  onPress={() => navigation.navigate("OlvidarPassword")}
                >
                  {({ pressed }) => (
                    <Text
                      style={{
                        color: pressed ? "#219b05" : "#82E5B5",
                      }}
                    >
                      Recupérala aquí
                    </Text>
                  )}
                </Pressable>
              </View>
              <View className="flex-row flex-wrap justify-center">
                <Text> ¿No tienes cuenta? </Text>
                <Pressable onPress={() => navigation.navigate("Registro")}>
                  {({ pressed }) => (
                    <Text
                      style={{
                        color: pressed ? "#219b05" : "#82E5B5",
                      }}
                    >
                      Regístrate aquí
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
}
