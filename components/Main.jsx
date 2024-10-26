import {
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Text,
  Linking
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import imagenes from "../assets/images.js";
import { Shadow } from "react-native-shadow-2";
import Icon from 'react-native-vector-icons/Ionicons';

export function Main() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="w-full h-full flex-1"
    >
      <Shadow
        className="w-full bg-white rounded-b-xl"
        distance={9}
        startColor={"#00000030"}
        offset={[0, 10]}
      >
        <View className="flex flex-row items-center justify-around h-20">
          <Image
            source={imagenes.IconMujer}
            className="h-full max-h-full "
            style={{ resizeMode: "contain" }}
          />
          <Text className=""> RutinFit </Text>
          <Image
            source={imagenes.IconHombre}
            className="h-full max-h-full "
            style={{ resizeMode: "contain" }}
          />
        </View>
      </Shadow>

      <ScrollView
        className=""
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="">
          <View className="border w-72 flex bg-slate-200 items-center">
            <Image source={imagenes.loginIcon} />
            <Text className="">Login</Text>
            <Text>Usuario</Text>
            <TextInput placeholder="Ingrese su usuario" />
            <Text>Contraseña</Text>
            <TextInput placeholder="Ingrese su contraseña" secureTextEntry />
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#0FA05A" : "#82E5B5",
                },
              ]}
            >
              <Text>Iniciar Sesión</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Shadow
        className="w-full bg-white rounded-t-xl mt-0"
        distance={9}
        startColor={"#00000030"}
        offset={[10, 0]}
      >
        <View className="flex flex-row">
          <View className="bg-slate-400">
            <Text> ¿Quienes somos?</Text>
            <Text> Contáctanos: </Text>
            <Text> correo@ejemplo.com </Text>
          </View>
          <View>
            <Text> Siguemos en nuestras redes sociales </Text>
            <View>
              <Pressable>
                <Icon name="logo-facebook" size={30} />
              </Pressable>
            </View>
          </View>
        </View>
      </Shadow>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
