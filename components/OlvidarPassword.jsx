import {
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer.jsx";

export function OlvidarPassword({ navigation }) {
  const insets = useSafeAreaInsets();
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
        <Shadow
          className="rounded-xl"
          distance={15}
          startColor={"rgba(130, 229, 181, 0.5)"}
        >
          <View
            style={{ maxWidth: "80%" }}
            className="w-64 items-center gap-y-2 flex flex-col mb-5"
          >
            <Image
              source={imagenes.loginIcon}
              className="min-w-[50px] min-h-[50px] h-28 w-28"
              style={{ resizeMode: "contain" }}
            />
            <Text className="font-extrabold text-4xl text-center">
              Recuperar Contraseña
            </Text>
            <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
              <Text className="">Correo:</Text>
              <TextInput
                placeholder="Ingrese su correo"
                className="border-b-2"
              />
            </View>
            <View className="flex-row w-full justify-evenly">
              <Pressable
                style={{
                  backgroundColor: "#82E5B5",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text className="">Enviar</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                style={{
                  backgroundColor: "#82E5B5",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text className="">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Shadow>
      </ScrollView>

      <Footer />
    </View>
  );
}
