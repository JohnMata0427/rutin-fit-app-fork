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
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";
import { ConfirmEmailViewModel } from "../models/ConfirmEmailModel";
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function CodigoPassword({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const { email } = route.params;

  const [codigo, setCodigo] = useState({
    code: "",
  });

  const [loading, setLoading] = useState(false);

  const { handleCodigo } = ConfirmEmailViewModel();

  const verificarCodigo = async () => {
    setLoading(true);
    const resultado = await handleCodigo(email, codigo.code);
    Alert.alert(resultado.titulo, resultado.mensaje);
    if (resultado.titulo === "Éxito")
      navigation.navigate("NuevaContraseña", { email });
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
            style={{ maxWidth: "70%",
              width: "70%",
              shadowColor: "#00ff82",
              elevation: 20,
              backgroundColor: "#fff",
             }}
            className="w-64 items-center gap-y-2 flex flex-col mb-5 rounded-2xl p-2"
          >
            <Image
              source={imagenes.loginIcon}
              className="min-w-[50px] min-h-[50px] h-28 w-28"
              style={{ resizeMode: "contain" }}
            />
            <Text className="font-extrabold text-2xl text-center">
              Revisa tu correo
            </Text>
            <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
              <View className="flex-row items-center">
                <Octicons name="number" size={24} color="black" />
                <Text className="ml-2 font-bold">Por favor ingrese el código:</Text>
              </View>
              <TextInput
                placeholder="Ingrese su correo"
                className="border-b-2"
                value={codigo}
                onChangeText={(text) => setCodigo({ ...codigo, code: text })}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-row w-full justify-evenly">
              <TouchableOpacity
                style={{
                  backgroundColor: "#82E5B5",
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={verificarCodigo}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <View className="flex-row items-center">
                    <Text className="mr-2 font-bold">Enviar</Text>
                    <MaterialIcons name="verified-user" size={20} color="black" />
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
                  <MaterialIcons name="close" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
