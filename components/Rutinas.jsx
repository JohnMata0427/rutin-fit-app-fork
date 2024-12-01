import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RutinaViewModel } from "../models/RutinaViewModel";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { MarcarDiaViewModel } from "../models/MarcarDiaViewModel";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function Rutinas() {
  const insets = useSafeAreaInsets();
  const { handleRutina } = RutinaViewModel();
  const { loading, handleMarcarDia, mensajesBack } = MarcarDiaViewModel();
  const [rutina, setRutinas] = useState({
    days: [],
    existe: false
  });

  const dias = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  const handleMarcarDiaPress = async (day) => {
    const token = await AsyncStorage.getItem("@auth_token");
    const marcar = await handleMarcarDia(token, day);
    if (marcar.success) {
      Alert.alert("Éxito", "Felicidades por competar un día de entrenamiento");
    }
  };

  useEffect(() => {
    const obtenerRutinas = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        //console.log(token);

        if (token) {
          const resultado = await handleRutina(token);
          //console.log(resultado.datos.routine);
          setRutinas({existe: true , ...resultado.datos.routine});
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
        { rutina.existe ? (

        <View
          className="bg-white p-3 space-y-3"
          style={{ maxWidth: "100%", width: "100%" }}
        >
          <View className="border-b-2">
            <Text className="text-lg font-bold">Días Asignados:</Text>
            {rutina.days
              .sort((a, b) => dias.indexOf(a.day) - dias.indexOf(b.day))
              .map((dia) => (
                <List.Accordion
                  key={dia.day}
                  title={`${dia.day.charAt(0).toUpperCase() + dia.day.slice(1)}`}
                  left={(props) => (
                    <List.Icon {...props} icon="calendar-today" />
                  )}
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  {dia?.exercises?.length > 0 ? (
                    dia.exercises.map((ejercicio) => (
                      <View
                        key={ejercicio?._id}
                        style={{ padding: 10, borderBottomWidth: 1 }}
                      >
                        <Text className="text-lg font-bold">Categoría:</Text>
                        <Text>
                          {ejercicio?.category || "Categoría no disponible"}
                        </Text>
                        <Text className="text-lg font-bold">Ejercicio:</Text>
                        <Text>{ejercicio?.name}</Text>
                        {ejercicio?.instructions?.length > 0 ? (
                          <View>
                            <Text className="text-lg font-bold">
                              Instrucciones:
                            </Text>
                            {ejercicio.instructions.map(
                              (instruccion, index) => (
                                <Text
                                  key={index}
                                  className="text-sm text-justify border-l-2 border-[#35b476] mb-2 p-2"
                                >
                                  {instruccion}
                                </Text>
                              )
                            )}
                            <View className="flex-row justify-center flex-wrap">
                              {ejercicio?.gifUrl?.length > 0 ? (
                                <Image
                                  source={{ uri: ejercicio?.gifUrl }}
                                  resizeMode="cover"
                                  style={{
                                    width: 250,
                                    height: 250,
                                    borderRadius: 8,
                                    backgroundColor: "#f0f0f0",
                                    margin: 5,
                                  }}
                                />
                              ) : (
                                <Text className="text-red-500">
                                  No hay imágenes de muestra
                                </Text>
                              )}
                            </View>
                          </View>
                        ) : (
                          <Text>No hay instrucciones</Text>
                        )}
                        {loading ? (
                          <ActivityIndicator color="#fff" size="small" />
                        ) : (
                          <TouchableOpacity
                            className="border-2 rounded-xl border-black bg-[#35b476]"
                            onPress={() => handleMarcarDiaPress(dia.day)}
                          >
                            <Text className="text-center text-black font-semibold p-2">
                              Marcar como completado
                            </Text>
                          </TouchableOpacity>
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
          <View className="p-3 border space-x-3 rounded-md">
            <Text className="w-full font-bold text-base">Comentarios:</Text>
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
          <View className="p-3 border space-x-3 rounded-md items-center">
            <Text className="text-xl ">¿Has sentido algún progreso?</Text>
            <Text>Puedes agregar tus cambios aquí:</Text>
            <Text className="text-justify">
              Por favor recuerda que los cambios deben ser respetuosos y
              constructivos, además, los cambios ingresados afectaran a su
              perfil, por ende, asegúrese de que los cambios sean correctos.
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder="Ingresa tu nuevo peso...."
              className="border-b-2 max-w-full w-full p-2"
              keyboardType="numeric"
            />
            <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder="Escribe aquí tus cambios...."
              className="border-b-2 max-w-full w-full p-2"
            />
          </View>
        </View>
        ) : (
          <View className="flex flex-col items-center justify-center h-screen">
            <FontAwesome5 name="sad-tear" size={24} color="black" />
            <Text className="text-2xl font-bold">No hay rutinas disponibles</Text>
          </View>
        )

        }
      </ScrollView>
    </View>
  );
}
