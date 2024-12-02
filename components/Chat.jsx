import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import NetInfo from "@react-native-community/netinfo";
import Feather from "@expo/vector-icons/Feather";
import { ChatViewModel } from "../models/ChatViewModel";
import { PerfilViewModel } from "../models/PerfilVewModel";

// Initialize socket connection
const socket = io(`${process.env.EXPO_PUBLIC_BACKEND}`.replace("/api/v1", ""));
console.log(`${process.env.EXPO_PUBLIC_BACKEND}`.replace("/api/v1", ""));

export function Chat() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);

  const [mensajes, setMensajes] = useState([]);
  const [mensajeNuevo, setMensajeNuevo] = useState("");
  const [perfil, setPerfil] = useState({});
  const [conectado, setConectado] = useState(true);

  const { handlePerfil } = PerfilViewModel();
  const { handleChat } = ChatViewModel();

  useEffect(() => {
    const suscribir = NetInfo.addEventListener(state => setConectado(state.isConnected));
    return () => suscribir();
  }, []);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const usuario = await AsyncStorage.getItem("@perfil");
        if (usuario) {
          setPerfil(JSON.parse(usuario));
        } else {
          const token = await AsyncStorage.getItem("@auth_token");
          const perfilBDD = await handlePerfil(token);
          setPerfil(perfilBDD.datos);
          await AsyncStorage.setItem("@perfil", JSON.stringify(perfilBDD.datos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPerfil();
  }, []);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        const usuario = await AsyncStorage.getItem("@perfil");
        if (token && usuario) {
          const client_id = JSON.parse(usuario).client.client_id;
          const coach_id = JSON.parse(usuario).client.coach_id;
          const respuesta = await handleChat(token, client_id, coach_id);
          setMensajes(respuesta.datos); // No invertimos los mensajes
        } else {
          const perfilBDD = await handlePerfil(token);
          const client_id = perfilBDD.datos.client.client_id;
          const coach_id = perfilBDD.datos.client.coach_id;
          const respuesta = await handleChat(token, client_id, coach_id);
          setMensajes(respuesta.datos); // No invertimos los mensajes
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerHistorial();
    socket.on("receive", mensaje => {
      setMensajes(state => [...state, mensaje]); // Agregar el nuevo mensaje al final
    });

    return () => socket.disconnect();
  }, [socket]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [mensajes]);

  const enviarMensaje = () => {
    if (mensajeNuevo.trim() === "") return;

    const nuevoMensaje = {
      message: mensajeNuevo,
      transmitter: perfil.client.client_id,
      receiver: perfil.client.coach_id,
      name: perfil.client.name,
      rol: "cliente",
      client_id: perfil.client.client_id,
      coach_id: perfil.client.coach_id,
      createdAt: Date.now(),
    };

    setMensajes([...mensajes, nuevoMensaje]); // Agregar el nuevo mensaje al final
    setMensajeNuevo("");
    socket.emit("send", nuevoMensaje);
  };

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
        <FlatList
          ref={flatListRef}
          className="flex-1 bg-slate-200"
          data={mensajes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const messageDate = new Date(item.createdAt);
            return (
              <View className={`${item.transmitter === perfil.client.client_id ? "self-end" : "self-start"}`}>
                <Text className={`${item.transmitter === perfil.client.client_id ? "self-end pr-2" : "self-start pl-2"} font-bold`}>{item.name}</Text>
                <View className={`p-2 m-2 rounded-lg border max-w-[70%] ${item.transmitter === perfil.client.client_id ? "bg-[#82E5B5] self-end" : "bg-white self-start"}`}>
                  <Text className="text-base">{item.message}</Text>
                </View>
                <Text className={`${item.transmitter === perfil.client.client_id ? "self-end pr-2" : "self-start pl-2"} text-xs`}>
                  {messageDate.toLocaleDateString() + "   " + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            );
          }}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Desplazar al final cuando cambia el contenido
          enableOnAndroid={true}
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
