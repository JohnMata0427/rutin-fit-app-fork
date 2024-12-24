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
import React, { useState } from "react";
import imagenes from "../assets/images.js";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import ModalPersonalizado from "../layouts/Modal.jsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import { RegisterViewModel } from "../models/RegistroViewModel.js";
import ModalIngresoCodigo from "../layouts/ModalCodigo.jsx";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons.js";

export function Registro({ navigation }) {
  const insets = useSafeAreaInsets();

  const {
    loading,
    modalVisible,
    mensajesBack,
    handleRegistro,
    setModalVisible,
  } = RegisterViewModel();

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const [modalCodigo, setModalCodigo] = useState(false);

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
    const resultado = await handleRegistro(
      datosRegistro.name,
      datosRegistro.lastname,
      datosRegistro.email,
      datosRegistro.password
    );
    if (resultado.success) {
      setModalCodigo(true);
    }
  };

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
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
            justifyContent: "center",
          }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View
            style={{
              maxWidth: "70%",
              width: "70%",
              shadowColor: "#00ff82",
              elevation: 20,
              backgroundColor: "#fff",
            }}
            className="w-64 items-center gap-y-2 flex flex-col my-2 rounded-2xl"
          >
            <Image
              source={imagenes.loginIcon}
              className="min-w-[50px] min-h-[50px] h-28 w-28"
              style={{ resizeMode: "contain" }}
            />
            <Text className="font-extrabold text-4xl">Registro</Text>
            <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
              <View className="flex-row items-center">
              <MaterialCommunityIcons name="card-account-details" size={20} color="black" />
                <Text className="ml-2 font-bold">Nombre:</Text>
              </View>
              <TextInput
                placeholder="Ingrese su Nombre"
                className="border-b-2"
                value={datosRegistro.name}
                onChangeText={(valor) =>
                  setDatosRegistro({ ...datosRegistro, name: valor })
                }
              />
              <View className="flex-row items-center">
              <MaterialCommunityIcons name="card-account-details" size={20} color="black" />
                <Text className="ml-2 font-bold">Apellido:</Text>
              </View>
              <TextInput
                placeholder="Ingrese su Apellido"
                className="border-b-2"
                value={datosRegistro.lastname}
                onChangeText={(valor) =>
                  setDatosRegistro({ ...datosRegistro, lastname: valor })
                }
              />
              <View className="flex-row items-center">
              <MaterialCommunityIcons name="email-multiple" size={20} color="black" />
                <Text className="ml-2 font-bold">Correo:</Text>
              </View>
              <TextInput
                placeholder="Ingrese su Correo"
                className="border-b-2"
                value={datosRegistro.email}
                onChangeText={(valor) =>
                  setDatosRegistro({ ...datosRegistro, email: valor })
                }
                keyboardType="email-address"
              />
              <View className="flex-row items-center">
              <MaterialIcons name="lock" size={20} color="black" />
                <Text className="ml-2 font-bold">Contraseña:</Text>
              </View>
              <View className="flex-row">
                <TextInput
                  placeholder="Ingrese su Contraseña"
                  className="border-b-2 flex-1"
                  secureTextEntry={!mostrarContraseña}
                  value={datosRegistro.password}
                  onChangeText={(valor) =>
                    setDatosRegistro({ ...datosRegistro, password: valor })
                  }
                />
                <TouchableOpacity onPress={manejarContraseñaVisible}>
                  <Icon
                    name={mostrarContraseña ? "eye-off" : "eye"}
                    size={24}
                    className="right-0"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
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
                <View className="flex-row items-center">
                  <AntDesign name="checkcircleo" size={20} color="black" />
                  <Text className="ml-2 font-bold">Registrarme</Text>
                </View>
              )}
            </TouchableOpacity>
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
            <View className="flex-row p-2 flex-wrap justify-center w-full ">
              <Text> ¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-[#82E5B5]">Inicia sesión aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>

      <Footer />
    </View>
  );
}
