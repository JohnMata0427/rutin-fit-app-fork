import {
  View,
  Image,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import axios from "axios";
import ModalPersonalizado from "../layouts/Modal.jsx";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";

export function Login({ navigation }) {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [mensajesBack, setMensajesBack] = useState([]);

  const [loginExitoso, setLoginExitoso] = useState(false);

  const [ mostrarContraseña , setMostrarContraseña ] = useState(false);

  const manejarContraseñaVisible = () => {
    setMostrarContraseña(!mostrarContraseña)
  }

  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setDatosLogin({ ...datosLogin, [name]: value });
  };

  useFocusEffect(
    useCallback(() => {
      setDatosLogin({
        email: "",
        password: "",
      });
    }, [])
  );

  const handleLogin = async () => {
    setLoading(true);
    try {
      const respuesta = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/login`,
        datosLogin
      );
      console.log("Login exitoso", respuesta.data);
      navigation.navigate("Datos");
      setLoginExitoso(true);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        let mensajes = error.response.data.errors.map((error) => error.msg);
        setMensajesBack(mensajes);
      } else if (error.response) {
        setMensajesBack([error.response.data.res]);
      } else {
        setMensajesBack(["Error desconocido"]);
      }
      setLoginExitoso(false);
      setModalVisible(true);
      console.log("Error al iniciar sesion ", error);
    } finally {
      setLoading(false);
    }
  };

  const manejarLogin = () => {
    if (loginExitoso) {
    }
    setModalVisible(false);
  };

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
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
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View className="mt-14 mb-14">
            <Shadow
              className="rounded-xl w-full"
              distance={15}
              startColor={"rgba(130, 229, 181, 0.5)"}
            >
              <View
                style={{ maxWidth: "100%" }}
                className="w-64 items-center gap-y-2 flex flex-col my-4"
              >
                <Image
                  source={imagenes.loginIcon}
                  className="min-w-[50px] min-h-[50px] h-28 w-28"
                  style={{ resizeMode: "contain" }}
                />
                <Text className="font-extrabold text-4xl">Login</Text>
                <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
                  <Text className="">Usuario:</Text>
                  <TextInput
                    placeholder="Ingrese su usuario"
                    className="border-b-2"
                    value={datosLogin.email}
                    onChangeText={(valor) => handleChange("email", valor)}
                  />
                  <Text>Contraseña:</Text>
                  <View className="flex-row">
                    <TextInput
                      placeholder="Ingrese su contraseña"
                      className="border-b-2 flex-1"
                      secureTextEntry={!mostrarContraseña}
                      value={datosLogin.password}
                      onChangeText={(valor) => handleChange("password", valor)}
                    />
                    <TouchableOpacity onPress={manejarContraseñaVisible}
                    className=""
                    >
                      <Icon name={mostrarContraseña ? "eye-off" : "eye"} size={24} className="right-0" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Pressable
                  //onPress={() => navigation.navigate("Datos")}
                  style={{
                    backgroundColor: "#82E5B5",
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text className="">Iniciar Sesión</Text>
                  )}
                </Pressable>
                <ModalPersonalizado
                  visible={modalVisible}
                  onclose={() => setModalVisible(false)}
                  titulo="Mensaje del sistema"
                  mensajes={mensajesBack}
                  accion={manejarLogin}
                />
                <View
                  className="flex-wrap flex-col gap-y-2 w-full"
                  style={{ maxWidth: "100%" }}
                >
                  <View className="flex-row flex-wrap justify-center w-full">
                    <Text className="">¿Olvidaste tu contraseña?</Text>
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
                  <View className="flex-row flex-wrap justify-center w-full">
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
            </Shadow>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
}
