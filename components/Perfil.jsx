import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { PerfilViewModel } from "../models/PerfilVewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Perfil() {
  const insets = useSafeAreaInsets();

  const { handlePerfil, loadingPerfil } = PerfilViewModel();
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    const obtenerDatosPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          const resultado = await handlePerfil(token);
          setPerfil(resultado.datos);
        } else {
          Alert.alert("Error", "No se encontró el token de autenticación");
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatosPerfil();
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="w-full h-full"
    >
      <LinearGradient
        colors={["#82E5B5", "#334155"]}
        className="border-b-2 border-black"
      >
        <View
          style={{
            maxWidth: "100%",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 200,
          }}
          className="w-full h-full"
        >
          <Image
            source={imagenes.perfil}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#ffff",
              aspectRatio: 1,
              borderRadius: 9999,
              resizeMode: "contain",
            }}
          />
        </View>
      </LinearGradient>

      <ScrollView
        className="h-full"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View className="items-center space-y-5 h-full mt-20">
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Nombre:</Text>
              <Text className="text-lg">{perfil?.client?.name}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Apellido:</Text>
              <Text className="text-lg">{perfil?.client?.lastname}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Correo:</Text>
              <Text className="text-lg">{perfil?.client?.email}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Entrenador:</Text>
              <Text className="text-lg">{perfil?.client?.coach_name}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Género:</Text>
              <Text className="text-lg">{perfil?.client?.genre}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Altura:</Text>
              <Text className="text-lg">{perfil?.client?.height}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Peso:</Text>
              <Text className="text-lg">{perfil?.client?.weight}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Edad:</Text>
              <Text className="text-lg">{perfil?.client?.age}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Nivel de actividad: </Text>
              <Text className="text-lg">{perfil?.client?.levelactivity}</Text>
            </View>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <View className="flex-row">
              <Text className="text-lg">Días de entrenamiento: </Text>
              {perfil?.client?.days?.map((element) => (
                <Text className="text-lg" key={element}>
                  {element}
                </Text>
              ))}
            </View>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}
