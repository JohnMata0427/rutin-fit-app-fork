import React, { useEffect } from "react";
import { useState } from "react";
import { EntrenadoresViewModel } from "../models/EntrenadoresViewModel.js";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useDatosViewModel } from "../models/DatosUsuarioModel.js";

export default function ModalEntrenadores({ token, visible, close, datos, setDatos }) {
  const {
    loading,
    handleEntrenadores,
  } = EntrenadoresViewModel();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [entrenadores, setEntrenadores] = useState([]);

  const cargarEntrenadores = async () => {
    const resultado = await handleEntrenadores(token);
    if (resultado.success) {
      setEntrenadores(resultado.datos);
    }
  };

  const handleElegirEntrenador = ( _id , nombre_coach) => {
    Alert.alert("Mensaje del sistema", "¿Deseas elegir a este entrenador?", [
      {
        text: "Aceptar",
        onPress: () => {setDatos({...datos, coach_id: _id , nombre_coach} )
         },
      },
      {
        text: "Cancelar",
        onPress: () => {},
      },
    ]);
    //close();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (visible) {
      cargarEntrenadores();
    }
  }, [visible]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="bg-black/20"
      >
        <View className="bg-white w-3/4 h-2/4 items-center rounded-xl border-2">
          <Text className="text-base font-bold text-black text-center p-3">
            Entrenadores
          </Text>
          <View className="border-2 w-full"></View>
          {loading ? (
            <ActivityIndicator size="large" color="#82E5B5" />
          ) : (
            <FlatList
              data={entrenadores}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="bg-slate-200 p-2 rounded-md my-3">
                  <View className="flex-row">
                    <Text> Nombre: </Text>
                    <Text> {item.user_id.name} </Text>
                  </View>
                  <View className="flex-row">
                    <Text> Apellido: </Text>
                    <Text> {item.user_id.lastname} </Text>
                  </View>
                  <View className="flex-row">
                    <Text> Correo: </Text>
                    <Text> {item.user_id.email} </Text>
                  </View>
                  <View className="flex-row flex-wrap">
                    <Text> Descripción: </Text>
                    <Text> {item.description} </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleElegirEntrenador(item._id , item.user_id.name)}
                    className="bg-[#82E5B5] rounded-md mt-3"
                  >
                    <Text className="text-center"> Seleccionar </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          <View className="border-t-2 w-full p-3 items-center">
            <TouchableOpacity
              className="w-3/4 bg-[#82E5B5] rounded-2xl"
              onPress={close}
            >
              <Text className="text-center "> Cerrar </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
