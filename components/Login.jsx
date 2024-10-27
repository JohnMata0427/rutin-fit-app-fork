import {
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Text,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/Ionicons";
//import LinearGradient from "react-native-linear-gradient";

export function Login() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="w-full h-full flex-1"
    >
      <View className="flex flex-row items-center justify-around h-20 border-b-2 rounded-b-xl border-x">
        <Image
          source={imagenes.IconMujer}
          className="h-full max-h-full "
          style={{ resizeMode: "contain" }}
        />
        <Image
          source={imagenes.RutinFit}
          className="h-full max-h-full w-24"
          style={{ resizeMode: "contain" }}
        />
        <Image
          source={imagenes.IconHombre}
          className="h-full max-h-full "
          style={{ resizeMode: "contain" }}
        />
      </View>

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
            style={{ maxWidth: "75%" }}
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
                      {" "}
                      Recupérala aquí{" "}
                    </Text>
                  )}
                </Pressable>
              </View>
              <View className="flex-row flex-wrap justify-center w-full">
                <Text> ¿No tienes cuenta? </Text>
                <Pressable>
                  {({ pressed }) => (
                    <Text
                      style={{
                        color: pressed ? "#219b05" : "#82E5B5",
                      }}
                    >
                      {" "}
                      Regístrate aquí{" "}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Shadow>
      </ScrollView>
      <Shadow
        className="bg-black rounded-t-xl flex-row p-1 max-w-full w-full"
        distance={9}
        startColor={"#00000030"}
        offset={[10, 0]}
      >
        <View className="flex-row w-full flex-wrap justify-center">
          <View className="flex-wrap max-w-[175px] flex justify-around">
            <Text className="text-white text-center"> ¿Quienes somos?</Text>
            <Text className="text-white text-center"> Contáctanos: </Text>
            <Pressable
              onPress={() => Linking.openURL("mailto:dustin04ms@gmail.com")}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "white" : "transparent",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 10,
                padding: 3,
              })}
            >
              {({ pressed }) => (
                <Text
                  style={{
                    color: pressed ? "black" : "white",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  dustin04ms@gmail.com{" "}
                </Text>
              )}
            </Pressable>
          </View>
          <View className="flex flex-col max-w-[200px]">
            <Text className="text-center text-white mb-1 flex flex-wrap">
              {" "}
              Siguemos en nuestras redes sociales:{" "}
            </Text>
            <View className="flex flex-row flex-wrap justify-center gap-2">
              <Pressable
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/DustinJMS")
                }
              >
                {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <Icon name="logo-facebook" size={30} color={"#ffff"} />
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <Icon name="logo-instagram" size={30} color={"#ffff"} />
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <Icon name="logo-twitter" size={30} color={"#ffff"} />
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <Icon name="logo-tiktok" size={30} color={"#ffff"} />
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <Icon name="logo-youtube" size={30} color={"#ffff"} />
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.1 : 1,
                })}
              >
                {({ pressed }) => (
                  <View style={{ opacity: pressed ? 0.5 : 1 }}>
                    <Icon name="logo-whatsapp" size={30} color={"#ffff"} />
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Shadow>
    </View>
  );
}