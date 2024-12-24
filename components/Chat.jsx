import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import NetInfo from "@react-native-community/netinfo";
import Feather from "@expo/vector-icons/Feather";
import { ChatViewModel } from "../models/ChatViewModel";
import { PerfilViewModel } from "../models/PerfilVewModel";
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";

// Initialize socket connection
const socket = io(`${process.env.EXPO_PUBLIC_BACKEND}`.replace("/api/v1", ""));

export function Chat() {
  const insets = useSafeAreaInsets();

  const { handleChat } = ChatViewModel();
  const { handlePerfil } = PerfilViewModel();

  const [mensajes, setMensajes] = useState([]);
  const [mensajeNuevo, setMensajeNuevo] = useState("");
  const [perfil, setPerfil] = useState({});
  const [conectado, setConectado] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const suscribir = NetInfo.addEventListener(state => setConectado(state.isConnected));
    return () => suscribir();
  }, []);

  useEffect(() => {
    const inicializar = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        
        setToken(token);

        const usuarioLocal = await AsyncStorage.getItem("@perfil");
        
        let usuarioBDD;
        if (usuarioLocal) {
          usuarioBDD = JSON.parse(usuarioLocal);
        } else {
          const perfilBDD = await handlePerfil(token);
          usuarioBDD = perfilBDD.datos;
          await AsyncStorage.setItem("@perfil", JSON.stringify(perfilBDD.datos));
        }
        setPerfil(usuarioBDD);

        if (usuarioBDD) {
          const client_id = usuarioBDD.client._id;
          const coach_id = usuarioBDD.client.coach_id._id;
          socket.emit("join", client_id);
          const respuesta = await handleChat(token, client_id, coach_id);
          setMensajes(respuesta.datos);
        }

      } catch (error) {
        console.error(error);
      }
    }
    inicializar();
    socket.on("receive", mensaje => {
      setMensajes(state => [...state, mensaje]); // Agregar el nuevo mensaje al principio 
    });
    return () => socket.off("receive");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const enviarMensaje = useCallback(() => {
    if (mensajeNuevo.trim() === "") return;
    const nuevoMensaje = {
      message: mensajeNuevo.trim(),
      transmitter: perfil.client._id,
      receiver: perfil.client.coach_id._id,
      name: perfil.client.user_id.name,
      rol: "cliente",
      client_id: perfil.client._id,
      coach_id: perfil.client.coach_id._id,
      createdAt: Date.now(),
    };
    setMensajes([...mensajes, nuevoMensaje]); // Agregar el nuevo mensaje al principio
    setMensajeNuevo("");
    socket.emit("send", nuevoMensaje);
  }, [mensajeNuevo, perfil]);
  
  const MensajesItem = React.memo(({ item , perfil }) => {
    const messageDate = new Date(item.createdAt);
    return (
      <View className={`${item.transmitter === perfil.client._id ? "self-end" : "self-start"}`}>
        <Text className={`${item.transmitter === perfil.client._id ? "self-end pr-2" : "self-start pl-2"} font-bold`}>{item.name}</Text>
        <View className={`p-2 m-2 rounded-lg border max-w-[70%] ${item.transmitter === perfil.client._id ? "bg-[#82E5B5] self-end" : "bg-white self-start"}`}>
          <Text className="text-base">{item.message}</Text>
        </View>
        <Text className={`${item.transmitter === perfil.client._id ? "self-end pr-2" : "self-start pl-2"} text-xs`}>
          {messageDate.toLocaleDateString() + "   " + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  });
  MensajesItem.displayName = "MensajesItem";


  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        <LinearGradient colors={["#82E5B5", "#4daf6f"]} className="border-b-2 border-black">
          <View style={{ flexDirection: "column", justifyContent: "flex-end", height: 75 }}>
            <Text className="text-2xl font-medium mb-2">Entrenador</Text>
          </View>
        </LinearGradient>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <AutoScrollFlatList
          className="flex-1  mt-2 overflow-hidden"
          data={mensajes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <MensajesItem item={item} perfil={perfil} />}
        />

        <View className="max-w-full flex-row h-auto items-center border-t-2 bg-white">
          <TextInput
            className="border-r-2 h-full p-2"
            multiline
            style={{ maxWidth: "75%", width: "75%" }}
            value={mensajeNuevo}
            onChangeText={setMensajeNuevo}
            placeholder="Escribe tu mensaje..."
          />
          {conectado ? (
            <TouchableOpacity onPress={enviarMensaje} className="flex-row justify-center items-center bg-[#82E5B5] h-full" style={{ maxWidth: "25%", width: "25%" }}>
              <Text>Enviar</Text>
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Feather name="wifi-off" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        </KeyboardAvoidingView>
    </View>
  );
}