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
import React, { useState } from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import ModalPersonalizado from "../layouts/Modal.jsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import { RegisterViewModel } from "../models/RegistroViewModel.js";
import ModalIngresoCodigo from "../layouts/ModalCodigo.jsx";

export function Registro({ navigation }) {
  const insets = useSafeAreaInsets();

  const { loading , modalVisible , mensajesBack , handleRegistro , setModalVisible} = RegisterViewModel();

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const [ modalCodigo , setModalCodigo ] = useState(false);

  const manejarContraseñaVisible = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const [datosRegistro, setDatosRegistro] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleRegistroPress = async () => {
    const resultado = await handleRegistro(datosRegistro.name , datosRegistro.lastname , datosRegistro.email , datosRegistro.password);
    if (resultado.success){
      setModalCodigo(true);
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
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
            alignItems: "center",
          }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View className="mt-14 mb-14">
            <Shadow
              className=""
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
                    onChangeText={(valor) => setDatosRegistro({...datosRegistro, name: valor})}
                  />
                  <Text className="">Apellido:</Text>
                  <TextInput
                    placeholder="Ingrese su Apellido"
                    className="border-b-2"
                    value={datosRegistro.lastname}
                    onChangeText={(valor) => setDatosRegistro({...datosRegistro, lastname: valor})}
                  />
                  <Text className="">Correo:</Text>
                  <TextInput
                    placeholder="Ingrese su Correo"
                    className="border-b-2"
                    value={datosRegistro.email}
                    onChangeText={(valor) => setDatosRegistro({...datosRegistro, email: valor})}
                    keyboardType="email-address"
                  />
                  <Text>Contraseña:</Text>
                  <View className="flex-row">
                    <TextInput
                      placeholder="Ingrese su Contraseña"
                      className="border-b-2 flex-1"
                      secureTextEntry={!mostrarContraseña}
                      value={datosRegistro.password}
                      onChangeText={(valor) => setDatosRegistro({...datosRegistro, password: valor})}
                    />
                    <TouchableOpacity onPress={manejarContraseñaVisible}>
                      <Icon name={mostrarContraseña ? "eye-off" : "eye"} size={24} className="right-0" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Pressable
                  style={{
                    backgroundColor: "#82E5B5",
                    padding: 10,
                    borderRadius: 5,
                    opacity: loading ? 0.5 : 1,
                  }}
                  onPress={handleRegistroPress}
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
                <ModalIngresoCodigo
                visible={modalCodigo}
                onclose={() => setModalCodigo(false)}
                correo={datosRegistro.email}
                navigation={navigation}
                handleRegistro={handleRegistro}
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
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>

      <Footer />
    </View>
  );
}
