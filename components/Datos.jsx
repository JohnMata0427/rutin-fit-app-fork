import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import Header from "../layouts/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDatosViewModel } from "../models/DatosUsuarioModel";
import { TouchableOpacity } from "react-native";
import ModalEntrenadores from "../layouts/ModalEntrenadores";
import { EntrenadoresViewModel } from "../models/EntrenadoresViewModel";

export function Datos({ navigation }) {
  const insets = useSafeAreaInsets();

  const {
    loading,
    modalVisible,
    setModalVisible,
    handleDatos,
    datos,
    setDatos,
  } = useDatosViewModel();

  ///const tokenUsuario = await AsyncStorage.getItem("token");
  const token = async () => {
    try {
      const obtenerToken = await AsyncStorage.getItem("@auth_token");
      console.log(obtenerToken);
      setDatos({ ...datos, token: obtenerToken });
    } catch (error) {
      console.error("Error al obtener el token: ", error);
    }
  };

  const dias = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  const seleccionDia = (dia) => {
    setDatos((diaSeleccionado) => {
      const days = diaSeleccionado.days.includes(dia)
        ? diaSeleccionado.days.filter((d) => d !== dia)
        : [...diaSeleccionado.days, dia];
      return { ...diaSeleccionado, days };
    });
  };

  const validacionesDatos = () => {
    console.log(datos);
    if (Object.values(datos).includes("") || datos.days.length === 0) {
      Alert.alert("Error", "Por favor, complete todos los campos");
      return false;
    }
    if (
      Object.values(datos.age && datos.height && datos.weight).includes(".") ||
      Object.values(datos.age && datos.height && datos.weight).includes(",") ||
      Object.values(datos.age && datos.height && datos.weight).includes("-") ||
      Object.values(datos.age && datos.height && datos.weight).includes("+")
    ) {
      Alert.alert("Error", "No se permiten caracteres especiales");
      return false;
    } else if (datos.age < 3 || datos.age > 100) {
      Alert.alert("Error", "La edad debe ser entre 3 y 100 años");
      return false;
    } else if (datos.height < 30 || datos.height > 250) {
      Alert.alert(
        "Error",
        "La altura ingresada es poco realista o no es un número"
      );
      return false;
    } else if (datos.weight < 10 || datos.weight > 500) {
      Alert.alert(
        "Error",
        "El peso ingresado es poco realista o no es un número"
      );
      return false;
    }
    handleDatos(
      datos.token,
      datos.genre,
      datos.weight,
      datos.height,
      datos.age,
      datos.levelactivity,
      datos.days,
      datos.coach_id
    ).then((resultado) => {
      console.log(resultado);
      if (resultado.success) {
        navigation.navigate("Main");
      }
    });
  };

  useEffect(() => {
    token();
  }, []);

  return (
    <View
      className="max-h-full bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Header />
      <ScrollView
        className="h-full"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          className="flex-col items-center flex justify-center gap-y-5 mb-14"
          style={{ maxWidth: "90%" }}
        >
          <Image
            source={imagenes.registroIcon}
            className="w-36 h-36"
            style={{ resizeMode: "contain" }}
          />
          <Text className="text-2xl font-bold text-center text-black">
            Datos Iniciales
          </Text>

          <View
            className="flex-col items-center bg-slate-300"
            style={{ maxWidth: "100%", width: "90%" }}
          ></View>
          <View
            className="flex flex-row  flex-wrap gap-x-5 w-full justify-center"
            style={{ maxWidth: "100%", width: "100%" }}
          >
            <View className="" style={{ maxWidth: "50%", width: "40%" }}>
              <Text className="text-base font-bold text-black">
                Altura(cm):
              </Text>
              <TextInput
                className="border-b-2"
                placeholder="Ingrese su altura"
                keyboardType="numeric"
                onChangeText={(valor) => setDatos({ ...datos, height: valor })}
              />
            </View>
            <View className="" style={{ maxWidth: "50%", width: "40%" }}>
              <Text className="text-base font-bold text-black">Peso(kg):</Text>
              <TextInput
                className="border-b-2"
                placeholder="Ingrese su peso"
                keyboardType="numeric"
                onChangeText={(valor) => setDatos({ ...datos, weight: valor })}
              />
            </View>
          </View>

          <View className="flex-col w-full gap-y-5" style={{ maxWidth: "90%" }}>
            <Text className="text-lg font-bold text-center text-black">
              {" "}
              Nivel de actividad física:{" "}
            </Text>
            <View className="border-b-2">
              <RNPickerSelect
                onValueChange={(valor) =>
                  setDatos({ ...datos, levelactivity: valor })
                }
                items={[
                  { label: "Principiante", value: "principiante" },
                  { label: "Intermedio", value: "intermedio" },
                  { label: "Avanzado", value: "avanzado" },
                ]}
                placeholder={{ label: "Seleccione su nivel", value: null }}
              />
            </View>
            <Text className="text-base font-bold text-black"> Edad: </Text>
            <TextInput
              keyboardType="numeric"
              className=" border-b-2"
              placeholder="Ingrese su edad"
              onChangeText={(valor) => setDatos({ ...datos, age: valor })}
            />
            <Text className="text-base font-bold text-black">Genero:</Text>
            <View className="border-b-2 max-w-full">
              <RNPickerSelect
                onValueChange={(valor) => setDatos({ ...datos, genre: valor })}
                items={[
                  { label: "Masculino", value: "masculino" },
                  { label: "Femenino", value: "femenino" },
                ]}
                placeholder={{ label: "Seleccione un genero", value: null }}
              />
            </View>
            <Text className="text-base font-bold text-black text-center">
              {" "}
              Días disponibles para hacer ejercicio:{" "}
            </Text>
            <View className=" gap-y-2 flex-row flex-wrap">
              {dias.map((dia, index) => (
                <View key={index} className="flex-row mx-3">
                  <TouchableOpacity
                    style={[
                      {
                        width: 20,
                        height: 20,
                        borderWidth: 2,
                        borderColor: "#000",
                        marginRight: 10,
                      },
                      datos.days.includes(dia)
                        ? { backgroundColor: "#82E5B5" }
                        : { backgroundColor: "#fff" },
                    ]}
                    onPress={() => seleccionDia(dia)}
                  />
                  <Text>{dia}</Text>
                </View>
              ))}
            </View>
            <Text className="text-base font-bold text-black text-center">
              Entrenadores disponibles:
            </Text>
            <TouchableOpacity
              className="bg-[#82E5B5] rounded-xl p-2"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-center"> Ver entrenadores </Text>
            </TouchableOpacity>
            <Text> Entreandor seleccionado: {datos.coach_id} </Text>
            <ModalEntrenadores
              visible={modalVisible}
              close={() => setModalVisible(false)}
              token={datos.token}
            />
          </View>
          <Pressable
            onPress={() => {validacionesDatos()}}
            disabled={loading}
            style={{
              backgroundColor: "#82E5B5",
              padding: 10,
              borderRadius: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="">Aceptar</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
