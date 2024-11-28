import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import { LinearGradient } from "expo-linear-gradient";
import { PerfilViewModel } from "../models/PerfilVewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import NetInfo from "@react-native-community/netinfo";

export function Perfil({navigation}) {
  const insets = useSafeAreaInsets();

  const { handlePerfil } = PerfilViewModel();
  const [perfil, setPerfil] = useState({});

  const dias = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"]

  const guardarDatosLocalmente = async ( key, valores ) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(valores));
    } catch (error) {
      console.log("Error al guardar los datos localmente: ",error);
    }
  }

  const obtenerDatosLocales = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log("Error al obtener los datos localmente: ", error);
      return null;
    }

  }

  const cerrarSesion = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {text: "Cancelar" , style: "cancel"},
      {text: "Aceptar", onPress: async () => {
        try {
          await AsyncStorage.removeItem('@auth_token');
          await AsyncStorage.removeItem('@perfil');
          navigation.navigate("Login")
        } catch( error ){
          console.log("Error al cerrar la sesion: ", error);
        }
      }}
    ])
  }

  useEffect(() => {
    const obtenerDatosPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          const { isConnected } = await NetInfo.fetch();
          if (isConnected) {
            const resultado = await handlePerfil(token);
            console.log(resultado.datos);
            setPerfil(resultado.datos);
            guardarDatosLocalmente("@perfil" , resultado.datos);
          } else{
            const datosLocales = await obtenerDatosLocales("@perfil");
            if (datosLocales) {
              setPerfil(datosLocales);
            } else{
              Alert.alert("Sin conexión", "No tienes conexión a internet y no hay datos almacenador localmente");
            }
          }
        } else {
          Alert.alert("Error", "No se encontró el token de autenticación");
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatosPerfil();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Nombre: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.name}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Apellido: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.lastname}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Correo: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.email}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Género: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.genre}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Peso: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.weight}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Altura: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.height}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Edad: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.age}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Nivel: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.levelactivity}</Text>
            </View>
          </View>

          <View className="flex-col mb-3" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
            <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Días de entrenamiento: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-row flex-wrap w-full justify-center">
              {perfil?.client?.days
              .sort((a,b) => dias.indexOf(a) - dias.indexOf(b))
              .map((element, idx, array) => (
                <Text className="text-lg" key={element}>
                  {element.charAt(0).toUpperCase() + element.slice(1)}
                  {idx < array.length -1 && "  -  "}
                </Text>
              ))}
            </View>
          </View>
          <View>

          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#82E5B5",
            padding: 10,
          }}
          onPress={cerrarSesion}
        >
          <Text className="text-center"> Cerrar sesión </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
