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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

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
          console.log(resultado.datos);
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
        paddingBottom: insets.bottom,
        flex: 1,
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
            height: 210,
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
        className="h-full bg-white"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          
        }}
      >
        <View className="items-center justify-center space-y-3">
          <Text className="text-3xl font-bold text-center mt-4">Perfil</Text>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <FontAwesome name="smile-o" size={24} color="black" />
              <Text className="text-sm">Nombre: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.name}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <FontAwesome name="smile-o" size={24} color="black" />
              <Text className="text-sm">Apellido: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.lastname}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <MaterialIcons name="alternate-email" size={24} color="black" />
              <Text className="text-sm">Correo: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.email}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="user" size={24} color="black" />
              <Text className="text-sm">Entrenador: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.coach_id}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <FontAwesome name="transgender" size={24} color="black" />
              <Text className="text-sm">Género: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.genre}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <FontAwesome6 name="weight-scale" size={20} color="black" />
              <Text className="text-sm">Peso: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.weight}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <MaterialCommunityIcons
                name="human-male-height-variant"
                size={24}
                color="black"
              />
              <Text className="text-sm">Altura: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.height}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <MaterialCommunityIcons
                name="timer-sand"
                size={24}
                color="black"
              />
              <Text className="text-sm">Edad: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.age}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <FontAwesome name="level-up" size={24} color="black" />
              <Text className="text-sm">Nivel: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.levelactivity}</Text>
            </View>
          </View>

          <View className="flex-col mb-3" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <FontAwesome6 name="calendar-days" size={24} color="black" />
              <Text className="text-sm">Días de entrenamiento: </Text>
            </View>
            <View className="border-[#82E5B5] border-2 rounded-2xl flex-col justify-center items-center w-full">
              {perfil?.client?.days?.map((element) => (
                <Text className="text-lg" key={element}>
                  {element}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View className="border"></View>

        <TouchableOpacity
          style={{
            backgroundColor: "#82E5B5",
            padding: 10,
          }}
        >
          <Text className="text-center"> Cerrar sesión </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
