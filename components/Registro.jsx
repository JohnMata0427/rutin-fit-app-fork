import {
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import axios from "axios";
import ModalPersonalizado from "../layouts/Modal.jsx";
//import {EXPO_PUBLIC_BACKEND_LOCAL_URI} from "@env";

export function Registro({ navigation }) {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

  const [ modalVisible , setModalVisible ] = useState(false);

  const [ mensajesBack , setMensajesBack ] = useState([]);

  const [datosRegistro, setDatosRegistro] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setDatosRegistro({
      ...datosRegistro,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const respuesta = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/sign-up`,
        datosRegistro
      );
      console.log("Registro exitoso", respuesta);
      // Alert.alert("Registro Exitoso", "Ya puede iniciar sesión!", [
      //   { text: "OK", onPress: () => navigation.navigate("Login") },
      // ]);
      setMensajesBack(["Registro Exitoso!"])
      setModalVisible(true);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        let mensajes = error.response.data.errors.map(error => error.msg);
        mensajes = mensajes.filter(mensaje => mensaje !== "Invalid value");
        mensajes = [...new Set(mensajes)]
        setMensajesBack(mensajes);
      } else if (error.response) {
        setMensajesBack([error.response.data.res]);
      } else {
        setMensajesBack(["Error desconocido"])
      }
      setModalVisible(true);
      console.log("Error al registrar", error);
      //Alert.alert("ERROR", "No se pudo registrar al usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
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
        <View className="mt-14 mb-14">
          <Shadow
            className="rounded-xl w-full"
            distance={15}
            startColor={"rgba(130, 229, 181, 0.5)"}
          >
            <View
              style={{ maxWidth: "100%" }}
              className="w-64 items-center gap-y-2 flex flex-col my-2"
            >
              <Image
                source={imagenes.loginIcon}
                className="min-w-[50px] min-h-[50px] h-28 w-28"
                style={{ resizeMode: "contain" }}
              />
              <Text className="font-extrabold text-4xl">Registro</Text>
              <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
                <Text className="">Nombre:</Text>
                <TextInput
                  placeholder="Ingrese su Nombre"
                  className="border-b-2"
                  value={datosRegistro.name}
                  onChangeText={(valor) => handleChange("name", valor)}
                />
                <Text className="">Apellido:</Text>
                <TextInput
                  placeholder="Ingrese su Apellido"
                  className="border-b-2"
                  value={datosRegistro.lastname}
                  onChangeText={(valor) => handleChange("lastname", valor)}
                />
                <Text className="">Correo:</Text>
                <TextInput
                  placeholder="Ingrese su Correo"
                  className="border-b-2"
                  value={datosRegistro.email}
                  onChangeText={(valor) => handleChange("email", valor)}
                  keyboardType="email-address"
                />
                <Text>Contraseña:</Text>
                <TextInput
                  placeholder="Ingrese su Contraseña"
                  className="border-b-2"
                  secureTextEntry
                  value={datosRegistro.password}
                  onChangeText={(valor) => handleChange("password", valor)}
                />
              </View>
              <Pressable
                style={{
                  backgroundColor: "#82E5B5",
                  padding: 10,
                  borderRadius: 5,
                  opacity: loading ? 0.5 : 1,
                }}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text className="">Registrarme</Text>
                )}
              </Pressable>
              <ModalPersonalizado 
              visible={modalVisible}
              onclose={() => setModalVisible(false)}
              titulo="Mensaje del sistema"
              mensajes={mensajesBack}
              />
              <View
                className="flex-wrap flex-col gap-y-2 w-full"
                style={{ maxWidth: "100%" }}
              >
                <View className="flex-row flex-wrap justify-center w-full">
                  <Text> ¿Ya tienes una cuenta? </Text>
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    {({ pressed }) => (
                      <Text
                        style={{
                          color: pressed ? "#219b05" : "#82E5B5",
                        }}
                      >
                        Inicia sesión aquí
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </Shadow>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
