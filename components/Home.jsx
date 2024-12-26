import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DiasCompletadosViewModel } from "../models/DiasCompletadosViewModel";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export function Home() {
  const insets = useSafeAreaInsets();

  const { handleDiasCompletados } = DiasCompletadosViewModel();

  const [diasCompletados, setDiasCompletados] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false); // Estado para el refresco

  const cargarDiasCompletados = async () => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (token) {
        const respuesta = await handleDiasCompletados(token);
        setDiasCompletados(respuesta.datos.completedDays || []);
      } else {
        console.log("Error al conseguir el token");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    cargarDiasCompletados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true); // Inicia el refresco
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      const respuesta = await handleDiasCompletados(token);
      setDiasCompletados(respuesta.datos.completedDays || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false); // Finaliza el refresco
    }
  };
  return (
    <View
      style={{ flex: 1, paddingBottom: insets.bottom }}
      className="items-center bg-white"
    >
      <LinearGradient
        colors={["#82E5B5", "#4daf6f"]}
        className="border-b-2 border-black w-full"
      >
        <View
          style={{
            maxWidth: "100%",
            position: "relative",
            flexDirection: "colum",
            justifyContent: "flex-end",
            width: "100%",
            height: 75,
          }}
          className="w-full h-full"
        >
          <View className="flex-row items-center mb-2">
            <Text className="text-2xl font-medium"> Progreso diario </Text>
            <FontAwesome6 name="calendar-days" size={20} color="black" />
          </View>
        </View>
      </LinearGradient>
      <FlatList
        data={diasCompletados}
        className="h-auto w-full bg-white"
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <>
            <View
              className="flex-row border-black border-2 justify-evenly rounded-2xl m-2 bg-[#82E5B5]"
              style={{ padding: 10, width: "95%" }}
            >
              <View className="">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-black">Día:</Text>
                  <Text className="text-black">{item.day}</Text>
                </View>
                <View className="flex flex-row items-center justify-between space-x-5">
                  <Text className="text-black">Fecha: </Text>
                  <Text className="text-black">
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View className="border"></View>
              <View className="flex flex-row items-center justify-evenly">
                <Text className="text-black">Completado</Text>
                <Ionicons name="happy-sharp" size={24} color="black" />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={
          <View className="w-full h-full items-center p-10">
            <FontAwesome5 name="sad-tear" size={24} color="black" />
            <Text className="text-2xl font-bold">No hay días completados</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />
        }
      />
    </View>
  );
}
