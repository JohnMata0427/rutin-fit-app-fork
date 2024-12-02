import {
    View,
    Image,
    ScrollView,
    TextInput,
    Pressable,
    Text,
    Alert,
  } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import React, { useState } from "react";
  import imagenes from "../assets/images.js";
  import { Shadow } from "react-native-shadow-2";
  import Header from "../layouts/Header";
  import Footer from "../layouts/Footer.jsx";
  import { cambiarContraseña } from "../services/AuthService.js";
  
  export function NuevaContraseña({ navigation , route }) {
    const insets = useSafeAreaInsets();

    const { email } = route.params;

    const [ contraseña, setContraseña] = useState({
        password: '',
        confirmPassword: '',
    })

    const updatePassword = async () => {
        try {
            console.log(email);
            console.log(contraseña.password);
            console.log(contraseña.confirmPassword);
            
            const datos = await cambiarContraseña(email, contraseña.password, contraseña.confirmPassword);
            console.log(datos)
            if (datos) {
                navigation.navigate('Login')
            } else {
                Alert.alert("Error" , "No se pudo cambiar la contraseña")
            }
        } catch (error) {
            console.log(error)
        }
    }
  
  
    return (
      <View
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="w-full h-full flex-1 bg-white"
      >
        <Header />
  
        <ScrollView
          className=""
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Shadow
            className="rounded-xl"
            distance={15}
            startColor={"rgba(130, 229, 181, 0.5)"}
          >
            <View
              style={{ maxWidth: "80%" }}
              className="w-64 items-center gap-y-2 flex flex-col mb-5"
            >
              <Image
                source={imagenes.loginIcon}
                className="min-w-[50px] min-h-[50px] h-28 w-28"
                style={{ resizeMode: "contain" }}
              />
              <Text className="font-extrabold text-2xl text-center">
                Escribir nueva contraseña
              </Text>
              <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
                <Text className="">Nueva contraseña:</Text>
                <TextInput
                  placeholder="Ingrese su correo"
                  className="border-b-2"
                  value={contraseña.password}
                  onChangeText={(text) => setContraseña({ ...contraseña, password: text })}
                />
              </View>
              <View style={{ maxWidth: "80%" }} className="w-full gap-y-3">
                <Text className="">Confirmar nueva contraseña:</Text>
                <TextInput
                  placeholder="Ingrese su correo"
                  className="border-b-2"
                  value={contraseña.confirmPassword}
                  onChangeText={(text) => setContraseña({ ...contraseña, confirmPassword: text })}
                />
              </View>
              <View className="flex-row w-full justify-evenly">
                <Pressable
                  style={{
                    backgroundColor: "#82E5B5",
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={updatePassword}
                >
                  <Text className="">Enviar</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("Login")}
                  style={{
                    backgroundColor: "#82E5B5",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text className="">Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Shadow>
        </ScrollView>
  
        <Footer />
      </View>
    );
  }
  