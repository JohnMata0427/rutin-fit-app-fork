import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DiasCompletadosViewModel } from "../models/DiasCompletadosViewModel";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

export function Home() {
  const insets = useSafeAreaInsets();

  const { handleDiasCompletados } = DiasCompletadosViewModel();

  const [diasCompletados, setDiasCompletados] = useState([]);

  const [loading, setLoading] = useState(false);

  const cargarDiasCompletados = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (token) {
        const respuesta = await handleDiasCompletados(token);
        console.log(respuesta);
        setDiasCompletados(respuesta.datos.completedDays || []);
      } else {
        console.log("Error al conseguir el token");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    cargarDiasCompletados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: 75,
          }}
          className="w-full h-full"
        >
          <Text className="text-2xl font-medium mb-2"> Progreso diario </Text>
        </View>
      </LinearGradient>
      <FlatList
        data={diasCompletados}
        className="h-auto w-full bg-white"
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <>
            <View className="flex-row border-black border-2 justify-evenly rounded-2xl m-2 bg-[#82E5B5]" style={{ padding: 10 , width: "95%" }}>
              <View className="">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-black">Día:</Text>
                  <Text className="text-black">{item.day}</Text>
                </View>
                <View className="flex flex-row items-center justify-between space-x-5">
                  <Text className="text-black">Fecha: </Text>
                  <Text className="text-black">{new Date(item.date).toLocaleDateString()}</Text>
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
          <View>
            <FontAwesome5 name="sad-tear" size={24} color="black" />
            <Text>No hay días completados</Text>
          </View>
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          className="border rounded-xl w-1/2 m-3"
          onPress={cargarDiasCompletados}
        >
          <Text className="p-3 text-center">Actualizar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
