import React, { useEffect } from "react";
import { Modal, View, Text, Pressable, TextInput, Alert } from "react-native";
import { ConfirmEmailViewModel } from "../models/ConfirmEmailModel";
import { useState } from "react";

export default function ModalIngresoCodigo({
  visible,
  onclose,
  correo,
  navigation,
}) {
  const [codigo, setCodigo] = useState({
    code: "",
  });

  const { handleCodigo } = ConfirmEmailViewModel();

  const verificarCodigo = async () => {
    const resultado = await handleCodigo(correo, codigo.code);
    // if(resultado.success){
    //     Alert.alert("Éxito", "Codigo verificado con éxito" , []);
    //     navigation.navigator("Home")
    // } else{
    //     Alert.alert("Error", "Código no válido o expirado");
    // }
    console.log(resultado);
    Alert.alert(resultado.titulo, resultado.mensaje);
    if (resultado.titulo === "Éxito") navigation.navigate("Main");
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
          <Text className="bg-slate-300">{correo} </Text>
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
            <Text className="text-center"> Verificar </Text>
          </Pressable>
          <Text className="italic text-center"> ¿No recibiste el código? </Text>
          <Pressable
            onPress={() => {
              onclose();
            }}
            style={{
              backgroundColor: "#82E5B5",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text className="text-center"> Reenviar código </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
