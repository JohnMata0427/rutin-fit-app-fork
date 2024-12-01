import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View, Button, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActualizarPerfilViewModel } from "../models/ActualizarPerfilViewModel";

export function UpdateProfileScreen  ({ navigation }) {

    const { handleUpdateProfile } = ActualizarPerfilViewModel();
  const [datos, setDatos] = useState({
    name: '',
    lastname: '',
    email: '',
    genre: '',
    weight: '',
    height: '',
    age: '',
    levelactivity: '',
    days: [],
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const obtenerToken = async () => {
    const token = await AsyncStorage.getItem("@auth_token");
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
    setLoading(true);
    try {
      const respuesta = await handleUpdateProfile(
        datos.name,
        datos.lastname,
        datos.email,
        datos.genre,
        datos.weight,
        datos.height,
        datos.age,
        datos.levelactivity,
        datos.days
      )

      const jsonResponse = await respuesta.json();
      if (respuesta.ok) {
        Alert.alert("Éxito", jsonResponse.res);
        navigation.goBack(); // Regresar a la pantalla anterior
      } else {
        Alert.alert("Error", jsonResponse.res);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Nombre:</Text>
      <TextInput
        placeholder="Ingrese su nombre"
        value={datos.name}
        onChangeText={(value) => setDatos({ ...datos, name: value })}
      />
      <Text>Apellido:</Text>
      <TextInput
        placeholder="Ingrese su apellido"
        value={datos.lastname}
        onChangeText={(value) => setDatos({ ...datos, lastname: value })}
      />
      <Text>Email:</Text>
      <TextInput
        placeholder="Ingrese su email"
        value={datos.email}
        onChangeText={(value) => setDatos({ ...datos, email: value })}
      />
      <Text>Género:</Text>
      <TextInput
        placeholder="Ingrese su género (masculino/femenino)"
        value={datos.genre}
        onChangeText={(value) => setDatos({ ...datos, genre: value })}
      />
      <Text>Peso (kg):</Text>
      <TextInput
        placeholder="Ingrese su peso"
        keyboardType="numeric"
        value={datos.weight}
        onChangeText={(value) => setDatos({ ...datos, weight: value })}
      />
      <Text>Altura (cm):</Text>
      <TextInput
        placeholder="Ingrese su altura"
        keyboardType="numeric"
        value={datos.height}
        onChangeText={(value) => setDatos({ ...datos, height: value })}
      />
      <Text>Edad:</Text>
      <TextInput
        placeholder="Ingrese su edad"
        keyboardType="numeric"
        value={datos.age}
        onChangeText={(value) => setDatos({ ...datos, age: value })}
      />
      <Text>Nivel de actividad:</Text>
      <TextInput
        placeholder="Ingrese su nivel de actividad (principiante/intermedio/avanzado)"
        value={datos.levelactivity}
        onChangeText={(value) => setDatos({ ...datos, levelactivity: value })}
      />
      <Text>Días disponibles:</Text>
      <TextInput
        placeholder="Ingrese los días disponibles (separados por comas)"
        value={datos.days.join(', ')}
        onChangeText={(value) => setDatos({ ...datos, days: value.split(',').map(day => day.trim()) })}
      />
      <Button title={loading ? "Guardando..." : "Guardar Cambios"} onPress={handleSave} disabled={loading} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </ScrollView>
  );
};
