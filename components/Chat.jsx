import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import imagenes from "../assets/images";
import { ChatViewModel } from "../models/ChatViewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const socket = io(
  `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}`.replace("/api/v1", "")
);

export function Chat() {
  const insets = useSafeAreaInsets();

  const [mensajes, setMensajes] = useState([]);
  const [mensajeNuevo, setMensajeNuevo] = useState("");

  const { handleChat } = ChatViewModel();

  const obtenerHistorial = async () => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      const respuesta = await handleChat(token);
      setMensajes(respuesta.datos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerHistorial();
    socket.on("receive", (mensaje) =>
      setMensajes((state) => [...state, mensaje])
    );
    return () => {socket.disconnect()};
  }, [socket]);

  const enviarMensaje = () => {
    if (mensajeNuevo.trim() !== "") {
      setMensajes([...mensajes, { text: mensajeNuevo, type: "enviado" }]);
      setMensajeNuevo("");
      socket.emit("send", {
        message: mensajeNuevo,
        trasnmitter: "",
        name: ""
      });
    }

  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom, height: "100%" }}>
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
          <Text className="text-2xl font-medium mb-2"> Entrenador </Text>
        </View>
      </LinearGradient>

      <KeyboardAwareFlatList
        className="flex-1"
        data={mensajes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            className={`p-2 m-2 rounded-lg border max-w-[70%] ${item.type === "enviado" ? "bg-[#82E5B5] self-end" : "bg-white self-start"}`}
          >
            <Text
              className={`text-base ${item.type === "enviado" ? "text-black" : "text-black"}`}
            >
              {item.text}
            </Text>
          </View>
        )}
        enableOnAndroid={true}
      />

      <TouchableOpacity
        onPress={() => {
          setMensajes((prevMensajes) => [
            ...prevMensajes,
            { text: "Mensaje de prueba recibido", type: "recibido" },
          ]);
        }}
        style={{
          backgroundColor: "#82E5B5",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Simular Mensaje</Text>
      </TouchableOpacity>

      <View className="max-w-full flex-row h-12 items-center border-t-2">
        <TextInput
          className="border-r-2 h-full p-2"
          style={{ maxWidth: "75%", width: "75%" }}
          value={mensajeNuevo}
          onChangeText={(text) => setMensajeNuevo(text)}
          placeholder="Escribe tu mensaje..."
        />
        <TouchableOpacity
          onPress={enviarMensaje}
          className="flex-row justify-center items-center bg-[#82E5B5] h-full"
          style={{ maxWidth: "25%", width: "25%" }}
        >
          <Text className="">Enviar</Text>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
