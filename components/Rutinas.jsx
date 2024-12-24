import React, { use, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  RefreshControl,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RutinaViewModel } from "../models/RutinaViewModel";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { MarcarDiaViewModel } from "../models/MarcarDiaViewModel";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { crearProgreso, progreso } from "../services/AuthService";
import { PerfilViewModel } from "../models/PerfilVewModel";

export function Rutinas() {
  const insets = useSafeAreaInsets();
  const { handleRutina } = RutinaViewModel();
  const { loading, handleMarcarDia } = MarcarDiaViewModel();
  const [rutina, setRutinas] = useState({
    routine: [{ days: [] }],
    existe: false,
  });
  const [isRefreshing, setIsRefreshing] = useState(false); // Estado para el refresco
  const [token, setToken] = useState(null);
  const { handlePerfil } = PerfilViewModel();
  const [perfil, setPerfil] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(false);

  const [datosProgresso, setDatosProgresso] = useState({
    currentWeight: 0,
    observations: "",
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

  useEffect(() => {
    const obtenerToken = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      setToken(token);
      const perfilLocal = await AsyncStorage.getItem("@perfil");
      if (perfilLocal) {
        setPerfil(JSON.parse(perfilLocal));
      } else {
        const perfil = await handlePerfil(token);
        setPerfil(perfil.datos);
        await AsyncStorage.setItem("@perfil", JSON.stringify(perfil.datos));
      }
    };
    obtenerToken();
  }, []);

  const handleMarcarDiaPress = async (day) => {
    const marcar = await handleMarcarDia(token, day);
    if (marcar.success) {
      Alert.alert("Éxito", "Felicidades por completar un día de entrenamiento");
    } else {
      Alert.alert(
        "Error",
        "El día que intentas marcar no coincide con el día de entrenamiento actual"
      );
    }
  };

  useEffect(() => {
    const obtenerRutinas = async () => {
      try {
        if (rutina.existe) {
          return;
        }
        if (token) {
          const resultado = await handleRutina(token);
          setRutinas({ existe: true, routine: resultado.datos.routine });
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRutinas();
  }, [token]);

  const refreshData = async () => {
    setIsRefreshing(true); // Inicia el refresco
    try {
      const resultado = await handleRutina(token);
      setRutinas({ existe: true, routine: resultado.datos.routine });
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false); // Finaliza el refresco
    }
  };

  const handleProgresso = async () => {
    setLoadingProgress(true);
    if (
      datosProgresso.observations.trim() === "" ||
      datosProgresso.currentWeight.trim() === ""
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      setLoadingProgress(false);
      return;
    }

    try {
      const resultado = await crearProgreso(
        token,
        datosProgresso.observations,
        datosProgresso.currentWeight
      );
      setDatosProgresso({ observations: "", currentWeight: "" });
      Alert.alert("Éxito", "Felicidades, tu progreso ha sido registrado");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProgress(false);
    }
  };

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
      {rutina.existe ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />
          }
        >
          {rutina.routine.map((rutina, index) => (
            <List.Accordion
              key={index}
              title={rutina?.nameRoutine}
              left={(props) => <List.Icon {...props} icon="calendar-today" />}
              style={{
                backgroundColor: "#f9f9f9",
                width: "100%",
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#000",
              }}
            >
              <View
                className="bg-white p-3 space-y-3"
                style={{ maxWidth: "100%", width: "100%" }}
              >
                <View>
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
                        style={{
                          backgroundColor: "#f9f9f9",
                          width: "100%",
                          marginBottom: 10,
                          borderWidth: 1,
                          borderColor: "#000",
                        }}
                      >
                        {dia?.exercises?.length > 0 ? (
                          dia.exercises.map((ejercicio) => (
                            <View
                              key={ejercicio?._id}
                              style={{ padding: 10, borderBottomWidth: 1 }}
                            >
                              <Text className="text-lg font-bold">
                                Ejercicio:
                              </Text>
                              <Text>{ejercicio?.name}</Text>
                              <Text className="text-lg font-bold">
                                Zona de cuerpo enfocada:
                              </Text>
                              <Text>
                                {ejercicio?.bodyPart ||
                                  "Informacion no disponible"}
                              </Text>
                              <Text className="text-lg font-bold">
                                Equipo necesario:
                              </Text>
                              <Text>
                                {ejercicio?.equipment ||
                                  "No se necesita equipo especial"}
                              </Text>
                              <Text className="text-lg font-bold">
                                Objetivo especifico del ejercicio:
                              </Text>
                              <Text>
                                {ejercicio?.target ||
                                  "No hay objetivo específico"}
                              </Text>
                              <Text className="text-lg font-bold">
                                Músculos secundarios:
                              </Text>
                              {ejercicio.secondaryMuscles?.map((musculo) => (
                                <Text key={musculo}>{musculo}</Text>
                              ))}
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
                  <View className="p-3 border space-x-3 rounded-md">
                    <Text className="w-full font-bold text-base">
                      Comentarios:
                    </Text>
                    <Text className="flex-1 text-justify">
                      {rutina.comments}
                    </Text>
                  </View>
                </View>
                <View className="flex-row p-3 border space-x-3 rounded-md items-center">
                  <Text className="font-bold text-base">Fecha de inicio:</Text>
                  <Text>
                    {new Date(rutina.start_date).toLocaleDateString()}
                  </Text>
                </View>
                <View className="flex-row p-3 border space-x-3 rounded-md items-center">
                  <Text className="font-bold text-base">Fecha de fin:</Text>
                  <Text>{new Date(rutina.end_date).toLocaleDateString()}</Text>
                </View>
              </View>
            </List.Accordion>
          ))}
          <View className="p-3 border space-y-3 rounded-md mt-5">
            <Text className="text-xl ">¿Has sentido algún progreso?</Text>
            <Text className="text-green-400">
              Por favor recuerda que los cambios deben ser respetuosos y
              constructivos, además, los cambios ingresados afectarán a su
              perfil, por ende, asegúrese de que los cambios sean correctos.
            </Text>
            <Text>Puedes agregar tus cambios aquí:</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder="Ingresa tu nuevo peso...."
              className="border-b-2 max-w-full w-full p-2"
              keyboardType="numeric"
              onChangeText={(text) =>
                setDatosProgresso({ ...datosProgresso, currentWeight: text })
              }
            />
            <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder="Escribe aquí tus cambios...."
              className="border-b-2 max-w-full w-full p-2"
              onChangeText={(text) =>
                setDatosProgresso({ ...datosProgresso, observations: text })
              }
            />
            <TouchableOpacity
              className="border-2 p-2 rounded-md bg-[#82E5B5]"
              onPress={() => handleProgresso()}
            >
              {loadingProgress ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text className="text-center"> Guardar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View className="flex flex-col items-center justify-center h-screen">
          <FontAwesome5 name="sad-tear" size={24} color="black" />
          <Text className="text-2xl font-bold">No hay rutinas disponibles</Text>
        </View>
      )}
    </View>
  );
}
