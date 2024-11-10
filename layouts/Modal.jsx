import React from "react";
import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ModalPersonalizado({
  visible,
  onclose,
  titulo,
  mensajes,
  accion
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onclose}
    >
      <View className="w-full h-full items-center justify-center p-5 flex-1 bg-black/20">
        <ScrollView
          style={{
            maxHeight: "50%",
            maxWidth: "90%",
            borderWidth: 2,
            borderColor: "#000",
            borderRadius: 10,
            backgroundColor: "white",
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-5 flex justify-center">
            <Text className="text-2xl text-center mb-2">{titulo}</Text>
            <View className="h-1 border-black border-2 mb-2" />
            {mensajes.map((mensaje, index) => (
              <View
                key={index}
                className="mb-2 flex-row p-3 items-center gap-2"
              >
                <MaterialIcons
                  name="report-gmailerrorred"
                  size={24}
                  color="black"
                />
                <Text className="flex-shrink text-center">{mensaje}</Text>
              </View>
            ))}
            <Pressable
              onPress={() => {
                accion();
                onclose();
              }}
              className=""
              style={{
                backgroundColor: "#82E5B5",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text className="text-center">Ok</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
