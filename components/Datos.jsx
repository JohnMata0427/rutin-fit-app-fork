import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import Header from "../layouts/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";

export function Datos( { navigation } ) {

  const insets = useSafeAreaInsets();
  const [valorSeleccionado, setValorSeleccionado] = useState({
    genero: "",
    edad: "",
    altura: "",
    peso: "",
    nivel: "",
  });

  const handleValueChange = (campo, valor) => {
    setValorSeleccionado((valores) => ({
      ...valores,
      [campo]: valor,
    }));
  };

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
          className="flex-col items-center flex justify-center gap-y-5"
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
              className="flex flex-row flex-wrap justify-center gap-x-5"
              style={{ maxWidth: "100%", width: "100%" }}
            >
              <View
                className=""
                style={{ maxWidth: "50%", width: "40%" }}
              >
                <Text className="text-base font-bold text-black">Genero:</Text>
                <View className="border-b-2 max-w-full">
                  <RNPickerSelect
                    onValueChange={(value) =>
                      handleValueChange("genero", value)
                    }
                    items={[
                      { label: "Masculino", value: "Masculino" },
                      { label: "Femenino", value: "Femenino" },
                      { label: "Otro", value: "Otro" },
                    ]}
                    placeholder={{ label: "Seleccione un genero", value: null }}
                  />
                </View>
              </View>
              <View
                className=""
                style={{ maxWidth: "50%", width: "40%" }}
              >
                <Text className="text-base font-bold text-black">Edad:</Text>
                <View className="border-b-2">
                  <RNPickerSelect
                    onValueChange={(value) => handleValueChange("edad", value)}
                    items={[
                      { label: "-12 años", value: "12-18" },
                      { label: "19-30 años", value: "31-50" },
                      { label: "50+ años", value: "50+" },
                    ]}
                    placeholder={{ label: "Seleccione una edad", value: null }}
                  />
                </View>
              </View>
            </View>
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
                />
              </View>
              <View className="" style={{ maxWidth: "50%", width: "40%" }}>
                <Text className="text-base font-bold text-black">
                  Peso(kg):
                </Text>
                <TextInput
                  className="border-b-2"
                  placeholder="Ingrese su peso"
                  keyboardType="numeric"
                />
              </View>
            </View>
          

          <View className="flex-col w-full">
            <Text className="text-lg font-bold text-center text-black">
              {" "}
              Nivel de actividad física:{" "}
            </Text>
            <View className="border-b-2">

            <RNPickerSelect
              onValueChange={(value) => handleValueChange("nivel", value)}
              items={[
                { label: "Bajo", value: "bajo" },
                { label: "Moderado", value: "moderado" },
                { label: "Alto", value: "alto" },
              ]}
              placeholder={{ label: "Seleccione una edad", value: null }}
            />
            </View>
          </View>
          <Pressable
          onPress={() => navigation.navigate("Main")}
            style={{
              backgroundColor: "#82E5B5",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text className="">Aceptar</Text>
          </Pressable>
          <Pressable
          onPress={() =>  navigation.navigate('Login')}

            style={{
              backgroundColor: "#82E5B5",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text className="">Atras</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
