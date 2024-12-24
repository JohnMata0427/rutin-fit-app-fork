import React, { useEffect } from "react";
import { Modal, View, Text, Pressable, TextInput, Alert } from "react-native";
import { ConfirmEmailViewModel } from "../models/ConfirmEmailModel";
import { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ModalIngresoCodigo({
  visible,
  onclose,
  correo,
  navigation,
  handleRegistro
}) {
  const [codigo, setCodigo] = useState({
    code: "",
  });

  const { handleCodigo } = ConfirmEmailViewModel();

  const verificarCodigo = async () => {
    const resultado = await handleCodigo(correo, codigo.code);
    Alert.alert(resultado.titulo, resultado.mensaje);
    if (resultado.titulo === "Éxito") navigation.navigate("Login");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onclose}
    >
      <View className="w-full h-full items-center justify-center flex-1 bg-black/20">
        <View className="p-5 flex justify-center gap-y-3 bg-white border-black border-2 mb-2 rounded-2xl">
          <Text className="text-2xl text-center mb-2">
            Se envió un codigo de verificación a tu correo:
          </Text>
          <TextInput
            placeholder="Codigo de verificacion"
            keyboardType="numeric"
            className="border-b-2"
            onChangeText={(valor) => setCodigo({ ...codigo, code: valor })}
          />

          <Pressable
            onPress={verificarCodigo}
            style={{
              backgroundColor: "#82E5B5",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <View className="flex-row items-center">
              <Text className="mr-2 font-bold">Verificar</Text>
              <MaterialIcons name="verified-user" size={20} color="black" />
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
