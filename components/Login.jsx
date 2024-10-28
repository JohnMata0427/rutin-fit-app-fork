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
import Header from  "../layouts/Header";
import Footer from "../layouts/Footer.jsx";

export function Login( { navigation } ) {

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
              />
              <Text>Contraseña:</Text>
              <TextInput
                placeholder="Ingrese su contraseña"
                className="border-b-2"
                secureTextEntry
              />
            </View>
            <Pressable
              style={{
                backgroundColor: "#82E5B5",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text className="">Iniciar Sesión</Text>
            </Pressable>
            <View
              className="flex-wrap flex-col gap-y-2 w-full"
              style={{ maxWidth: "100%" }}
            >
              <View className="flex-row flex-wrap justify-center w-full">
                <Text className="">¿Olvidaste tu contraseña?</Text>
                <Pressable style={{}}>
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
      </ScrollView>

      <Footer />

    </View>
  );
}