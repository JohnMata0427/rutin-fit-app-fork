import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RutinaViewModel } from "../models/RutinaViewModel";
import { LinearGradient } from "expo-linear-gradient";
import imagenes from "../assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Rutinas() {
  const insets = useSafeAreaInsets();
  const { loading, handleRutina } = RutinaViewModel();
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    const obtenerRutinas = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
          const resultado = await handleRutina(token);
          console.log(resultado.datos);
          setRutinas([resultado.datos.routine]);
          if (resultado.success === false) {
            setRutinas(["No hay rutinas asignadas"]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRutinas();
  }, []);

  return (
    <View style={{ paddingBottom: insets.bottom }}>
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
      <ScrollView className="h-full">
        <View>
          {rutinas.map((rutina, index) => (
            <View key={index} className="">
              <Text className="text-lg font-bold">
                ID Cliente: {rutina.client_id._id}
              </Text>
              <Text className="text-lg font-bold">
                ID Entrenador: {rutina.coach_id._id}
              </Text>
              <View>
                <Text className="text-lg font-bold">Días Asignados:</Text>
                {rutina.days.map((dia, diaIndex) => (
                  <View key={diaIndex}>
                    <Text>Día: {dia.day}</Text>
                    {dia.exercises.length > 0 ? (
                      dia.exercises.map((ejercicio) => (
                        <Text> {ejercicio} </Text>
                      ))
                    ) : (
                      <Text> No hay ejercicios asignados </Text>
                    )}
                  </View>
                ))}
              </View>
              <Text> Comentarios: {rutina.comments} </Text>
              <Text>
                {" "}
                Fecha de inicio:{" "}
                {new Date(rutina.start_date).toLocaleDateString()}{" "}
              </Text>
              <Text>
                {" "}
                Fecha de fin: {new Date(
                  rutina.end_date
                ).toLocaleDateString()}{" "}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
