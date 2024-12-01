import React, { useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { ChatViewModel } from "../models/ChatViewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const socket = io(`${process.env.EXPO_PUBLIC_BACKEND}`.replace("/api/v1", ""));
console.log(`${process.env.EXPO_PUBLIC_BACKEND}`.replace("/api/v1", ""));

export function Chat() {
  const insets = useSafeAreaInsets();

  const [mensajes, setMensajes] = useState([]);
  const [mensajeNuevo, setMensajeNuevo] = useState("");
  const [perfil, setPerfil] = useState({});

  const { handleChat } = ChatViewModel();

  const obtenerHistorial = async () => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      const usuario = await AsyncStorage.getItem("@perfil");
      const client_id = JSON.parse(usuario).client.client_id;
      const coach_id = JSON.parse(usuario).client.coach_id;
      const respuesta = await handleChat(token, client_id, coach_id);
      setMensajes(respuesta.datos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const datosPerfil = async () => {
      try {
        const usuario = await AsyncStorage.getItem("@perfil");
        setPerfil(JSON.parse(usuario));
      } catch (error) {
        console.log(error);
      }
    };
    datosPerfil();
  }, []);

  useEffect(() => {
    obtenerHistorial();
    socket.on("receive", (mensaje) =>
      setMensajes((state) => [...state, mensaje])
    );
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const enviarMensaje = () => {
    if (mensajeNuevo.trim() !== "") {
      setMensajes([
        ...mensajes,
        {
          message: mensajeNuevo,
          transmitter: perfil.client.client_id,
          receiver: perfil.client.coach_id,
          name: perfil.client.name,
          rol: "cliente",
          client_id: perfil.client.client_id,
          coach_id: perfil.client.coach_id,
        },
      ]);
      setMensajeNuevo("");
      socket.emit("send", {
        message: mensajeNuevo,
        transmitter: perfil.client.client_id,
        receiver: perfil.client.coach_id,
        name: perfil.client.name,
        rol: "cliente",
        client_id: perfil.client.client_id,
        coach_id: perfil.client.coach_id,
        createdAt: Date.now(),
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
        className="flex-1 bg-slate-200"
        data={mensajes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            className={`${item.transmitter === perfil.client.client_id ? "self-end" : "self-start"}`}
          >
            <Text className={`${item.transmitter === perfil.client.client_id ? "self-end pr-2" : "self-start pl-2"} font-bold`}>{item.name}</Text>
            <View
              className={`p-2 m-2 rounded-lg border max-w-[70%] ${item.transmitter === perfil.client.client_id ? "bg-[#82E5B5] self-end" : "bg-white self-start"}`}
            >
              <Text className={`text-base`}>{item.message}</Text>
            </View>
            <Text className={`${item.transmitter === perfil.client.client_id ? "self-end pr-2" : "self-start pl-2"} text-xs`}>{new Date(item.createdAt).toLocaleDateString() + "   " + new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        )}
        enableOnAndroid={true}
      />

      <View className="max-w-full flex-row h-12 items-center border-t-2 bg-white">
        <TextInput
          className="border-r-2 h-full p-2"
          multiline={true}
          numberOfLines={40}
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
