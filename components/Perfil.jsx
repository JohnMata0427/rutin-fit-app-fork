import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Alert,
  Switch,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import { LinearGradient } from "expo-linear-gradient";
import { PerfilViewModel } from "../models/PerfilVewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export function Perfil({ navigation }) {
  const insets = useSafeAreaInsets();

  const { handlePerfil } = PerfilViewModel();
  const [perfil, setPerfil] = useState({});
  const [notificaciones, setNotificaciones] = useState(false);
  const [token, setToken] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // Estado para el refresco

  useEffect(() => {
    const verificarEstadoPermisos = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificaciones(status === "granted");
    };
    verificarEstadoPermisos();
  }, []);

  useEffect(() => {
    const token = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      console.log("Token: ", token);
      setToken(token);
    };
    token();
  }, []);

  const handleNotificaciones = async (valor) => {
    if (valor) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === "granted") {
        setNotificaciones(true);
        Alert.alert("Éxito", "Se han habilitado las notificaciones");
      } else {
        setNotificaciones(false);
        Alert.alert("Error", "Por favor habilita las notificaciones");
      }
    } else {
      setNotificaciones(false);
      Alert.alert(
        "Notificaciones desactivadas",
        "Ya no recibiras notificaciones"
      );
    }
  };

  const dias = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  const guardarDatosLocalmente = async (key, valores) => {
    try {
      if (valores) {
        await AsyncStorage.setItem(key, JSON.stringify(valores));
      }
    } catch (error) {
      console.log("Error al guardar los datos localmente: ", error);
    }
  };

  const cerrarSesion = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aceptar",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("@auth_token");
            await AsyncStorage.removeItem("@perfil");
            navigation.navigate("Login");
          } catch (error) {
            console.log("Error al cerrar la sesion: ", error);
          }
        },
      },
    ]);
  };

  const obtenerDatosPerfil = async () => {
    try {
      const { isConnected } = await NetInfo.fetch();
      if (isConnected && token) {
        const resultado = await handlePerfil(token);
        setPerfil(resultado.datos);
        await guardarDatosLocalmente("@perfil", resultado.datos);
      } else {
        const datosLocales = await AsyncStorage.getItem("@perfil");
        if (datosLocales) {
          console.log("Cargando datos desde el almcacen local....");
          setPerfil(JSON.parse(datosLocales));
        } else {
          Alert.alert(
            "Sin conexión",
            "No tienes conexión a internet y no hay datos almacenador localmente"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerDatosPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const refreshData = async () => {
    setIsRefreshing(true); // Inicia el refresco
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      const resultado = await handlePerfil(token);
      setPerfil(resultado.datos);
      guardarDatosLocalmente("@perfil", resultado.datos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false); // Finaliza el refresco
    }
  };
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
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />
        }
      >
        <View className="items-center bg-white" style={{ marginVertical: 10 }}>
          <View className="flex-row items-center w-full justify-evenly" style={{ marginVertical: 10 }}>
            <Text className="text-3xl font-bold text-center">Perfil</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdateProfile", { perfil })}
            >
              <AntDesign name="edit" size={30} color="black" />
            </TouchableOpacity>
            <View className="flex-row items-center">
              <Text className="font-bold">Notificaciones: </Text>
              <Switch
                value={notificaciones}
                onValueChange={handleNotificaciones}
              />
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Nombre: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.user_id?.name}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Apellido: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">
                {perfil?.client?.user_id?.lastname}
              </Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Correo: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.user_id?.email}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Género: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.genre}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Peso: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.weight}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Altura: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.height}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Edad: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.age}</Text>
            </View>
          </View>
          <View className="flex-col" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Nivel: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <Text className="text-lg">{perfil?.client?.levelactivity}</Text>
            </View>
          </View>

          <View className="flex-col mb-3" style={{ width: "80%", marginVertical: 10 }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="star" size={17} color="black" />
              <Text className="text-sm">Días de entrenamiento: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-row flex-wrap w-full justify-center">
              {perfil?.client?.days
                .sort((a, b) => dias.indexOf(a) - dias.indexOf(b))
                .map((element, idx, array) => (
                  <Text className="text-lg" key={element}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}
                    {idx < array.length - 1 && "  -  "}
                  </Text>
                ))}
            </View>
          </View>
          <View></View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#82E5B5",
            padding: 10,
          }}
          onPress={cerrarSesion}
          className="flex-row items-center justify-center"
        >
          <Text className="text-center font-bold"> Cerrar sesión </Text>
          <MaterialCommunityIcons name="location-exit" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
