import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RutinaViewModel } from "../models/RutinaViewModel";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { List } from "react-native-paper";

export function Rutinas() {
  const insets = useSafeAreaInsets();
  const { handleRutina } = RutinaViewModel();
  const [rutina, setRutinas] = useState({});

  const dias = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  useEffect(() => {
    const obtenerRutinas = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          const resultado = await handleRutina(token);
          console.log(resultado.datos.routine);
          setRutinas(resultado.datos.routine);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRutinas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <LinearGradient
        colors={["#82E5B5", "#4daf6f"]}
        className="border-b-2 border-black"
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
          <Text className="text-2xl font-medium mb-2"> Rutinas Asignadas </Text>
        </View>
      </LinearGradient>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          className="bg-white p-3 space-y-3"
          style={{ maxWidth: "100%", width: "100%" }}
        >
          <View className="border-b-2">
            <Text className="text-lg font-bold">Días Asignados:</Text>
            {rutina.days
              .sort((a, b) => dias.indexOf(a.day) - dias.indexOf(b.day))
              .map((dia, diaIndex) => (
                <List.Accordion
                  key={dia.day}
                  title={`${dia.day.charAt(0).toUpperCase() + dia.day.slice(1)}`}
                  left={(props) => (
                    <List.Icon {...props} icon="calendar-today" />
                  )}
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  {dia?.exercises?.length > 0 ? (
                    dia.exercises.map((ejercicio, ejercicioIndex) => (
                      <View
                        key={ejercicio?._id}
                        style={{ padding: 10, borderBottomWidth: 1 }}
                      >
                        <View>
                          <Text className="text-lg font-bold">Categoría:</Text>
                          <Text>{}</Text>
                        </View>
                        <View>
                          <Text className="text-lg font-bold">Ejercicio:</Text>
                          <Text>{ejercicio?.name}</Text>
                        </View>
                        {ejercicio?.instructions?.length > 0 ? (
                          <View className="">
                            <Text className="text-lg font-bold">
                              Instrucciones:{" "}
                            </Text>
                            {ejercicio.instructions.map(
                              (instruccion, instruccionIndex) => (
                                <View className="flex-row space-y-2">
                                  <Text
                                    key={instruccion}
                                    className="text-sm text-justify border-l-2 border-[#35b476] mb-2 p-2"
                                  >
                                    {instruccion}
                                  </Text>
                                </View>
                              )
                            )}
                            <View className="flex-row justify-center flex-wrap">
                              {ejercicio?.images?.length > 0 ? (
                                ejercicio.images.map((imagen, idx) => (
                                  <Image
                                    key={imagen}
                                    source={{
                                      uri: imagen,
                                    }}
                                    resizeMode="cover"
                                    style={{
                                      width: 250,
                                      height: 250,
                                      borderRadius: 8,
                                      backgroundColor: "#f0f0f0",
                                      margin: 5,
                                    }}
                                  />
                                ))
                              ) : (
                                <Text className="text-red-500">
                                  {" "}
                                  No hay imagenes de muestra{" "}
                                </Text>
                              )}
                            </View>
                          </View>
                        ) : (
                          <Text> No hay Instrucciones </Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <AntDesign
                        name="exclamationcircleo"
                        size={20}
                        color="black"
                      />
                      <Text style={{ marginLeft: 5 }}>
                        No hay ejercicios asignados
                      </Text>
                    </View>
                  )}
                </List.Accordion>
              ))}
          </View>
          <View className=" p-3 border space-x-3 rounded-md">
            <Text className="w-full font-bold text-base"> Comentarios:</Text>
            <Text className="flex-1 text-justify">{rutina.comments}</Text>
          </View>
          <View className="flex-row p-3 border space-x-3 rounded-md items-center">
            <Text className="font-bold text-base">Fecha de inicio:</Text>
            <Text>{new Date(rutina.start_date).toLocaleDateString()}</Text>
          </View>
          <View className="flex-row p-3 border space-x-3 rounded-md items-center">
            <Text className="font-bold text-base">Fecha de fin:</Text>
            <Text>{new Date(rutina.end_date).toLocaleDateString()}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
