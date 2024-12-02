import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActualizarPerfilViewModel } from "../models/ActualizarPerfilViewModel";
import { LinearGradient } from "expo-linear-gradient";
import imagenes from "../assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import ModalPersonalizado from "../layouts/Modal";

export function UpdateProfileScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { handleUpdateProfile , mensajesBack , modalVisible, setModalVisible} = ActualizarPerfilViewModel();
  const { perfil } = route.params;
  const [datos, setDatos] = useState({
    name: perfil.client?.name || "",
    lastname: perfil?.client?.lastname || "",
    email: perfil?.client?.email || "",
    genre: perfil?.client?.genre || "",
    weight: perfil?.client?.weight?.toString() || "",
    height: perfil?.client?.height?.toString() || "",
    age: perfil?.client?.age?.toString() || "",
    levelactivity: perfil?.client?.levelactivity || "",
    days: perfil?.client?.days || [],
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const obtenerToken = async () => {
    const token = await AsyncStorage.getItem("@auth_token");
    console.log(token);
    if (token) {
      setToken(token);
    } else {
      console.log("Error al conseguir el token");
    }
  };

  useEffect(() => {
    
    obtenerToken();
    // Aquí puedes cargar los datos existentes del perfil si es necesario
  }, []);

  const handleSave = async () => {
    try {
      const respuesta = await handleUpdateProfile(
        token,
        datos.name,
        datos.lastname,
        datos.email,
        datos.genre,
        datos.weight,
        datos.height,
        datos.age,
        datos.levelactivity,
        datos.days
      );
      
      if(respuesta.success){
        Alert.alert("Éxito", "Perfil actualizado con éxito", [{
          text: "Aceptar",
          onPress: () => navigation.navigate("Home")
        }])};
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        flex: 1,
      }}
      className="w-full h-full"
    >
      <LinearGradient
        colors={["#82E5B5", "#334155"]}
        className="border-b-2 border-black"
      >
        <View
          style={{
            maxWidth: "100%",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 210,
          }}
          className="w-full h-full"
        >
          <Image
            source={imagenes.perfil}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#ffff",
              aspectRatio: 1,
              borderRadius: 9999,
              resizeMode: "contain",
            }}
          />
        </View>
      </LinearGradient>
      <ScrollView
        className="h-full bg-white"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <ModalPersonalizado
          visible={modalVisible}
          onclose={() => setModalVisible(false)}
          titulo="Mensaje del sistema"
          mensajes={mensajesBack}
        />
        <View className="items-center justify-center space-y-3 mt-5 mb-5">

          <Text className="text-3xl font-bold text-center ">Actualización de perfil</Text>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Nombre: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.name}
                onChangeText={(value) => setDatos({ ...datos, name: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Apellido: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.lastname}
                onChangeText={(value) => setDatos({ ...datos, lastname: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Correo: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.email}
                onChangeText={(value) => setDatos({ ...datos, email: value })}
                className="text-lg text-center"
                editable={false}
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Género: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.genre}
                onChangeText={(value) => setDatos({ ...datos, genre: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Peso: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.weight}
                onChangeText={(value) => setDatos({ ...datos, weight: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Altura: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.height}
                onChangeText={(value) => setDatos({ ...datos, height: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Edad: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.age}
                onChangeText={(value) => setDatos({ ...datos, age: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Nivel de actividad: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
                placeholder="Ingrese su género (masculino/femenino)"
                value={datos.levelactivity}
                onChangeText={(value) => setDatos({ ...datos, levelactivity: value })}
                className="text-lg text-center"
              />
            </View>
          </View>

          <View className="flex-col" style={{ width: "80%" }}>
            <View className="flex flex-row left-0 items-center w-full space-x-2">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="text-sm">Días de entrenamiento: </Text>
            </View>
            <View className="border-b-[#82E5B5] border-b-2 rounded-2xl flex-col justify-center items-center w-full">
              <TextInput
              placeholder="Ingrese los días disponibles (separados por comas)"
              value={datos.days.join(", ")}
              onChangeText={(value) =>
                setDatos({
                  ...datos,
                  days: value.split(",").map((day) => day.trim()),
                })
              }
              multiline
              className="text-lg text-center" 
              />
            </View>
          </View>
          <View className="flex flex-row justify-evenly items-center w-full">
            <TouchableOpacity
            className="border-2 p-2 rounded-md bg-[#82E5B5]"
            onPress={handleSave}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Text className="text-base text-center">Guardar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="border-2 p-2 rounded-md bg-[#82E5B5]"
            >
              <Text className="text-base text-center">Cancelar</Text>
            </TouchableOpacity>

          </View>
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>
      </ScrollView>
    </View>
  );
}
