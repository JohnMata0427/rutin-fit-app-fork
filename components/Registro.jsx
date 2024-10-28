import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import { Shadow } from "react-native-shadow-2";

export function Registro() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="max-h-full bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Header />
      <ScrollView className="h-full" style={{ flexGrow: 1 }}>
        <View className="flex-col bg-slate-400 items-center flex justify-center" style={{ maxWidth:"100%" }}>
          <Image
            source={imagenes.registroIcon}
            className="max-h-full max-w-full w-36 h-36"
            style={{ resizeMode: "contain" }}
          />
          <Text className="text-2xl font-bold text-center text-black">
            Registro
          </Text>
          <View className="flex flex-row w-full justify-between bg-slate-300" style={{maxWidth:"90%"}}>
            <View className="bg-slate-50" style={{maxWidth:"50%" , width:"47%"}}>
              <Text className="text-lg font-bold text-black">
                Nombre:
              </Text>
              <TextInput className="border border-black" />
            </View>
            <View className="bg-slate-50" style={{maxWidth:"50%" , width:"47%"}}>
              <Text className="text-lg font-bold text-black">
                Apellido:
              </Text>
              <TextInput className="border border-black" />
            </View>
          </View>
          <View className="flex-row items-center justify-center">
            <View>
              <Text className="text-lg font-bold text-center text-black">
                Nombre:
              </Text>
              <TextInput className="border border-black" />
            </View>
            <View>
              <Text className="text-lg font-bold text-center text-black">
                Apellido:
              </Text>
              <TextInput className="border border-black" />
            </View>
          </View>
          <View className="flex-row items-center justify-center">
            <View>
              <Text className="text-lg font-bold text-center text-black">
                Nombre:
              </Text>
              <TextInput className="border border-black" />
            </View>
            <View>
              <Text className="text-lg font-bold text-center text-black">
                Apellido:
              </Text>
              <TextInput className="border border-black" />
            </View>
          </View>
          <View className="flex-row items-center justify-center">
            <View>
              <Text className="text-lg font-bold text-center text-black">
                Nombre:
              </Text>
              <TextInput className="border border-black" />
            </View>
            <View>
              <Text className="text-lg font-bold text-center text-black">
                Apellido:
              </Text>
              <TextInput className="border border-black" />
            </View>
          </View>
          <Text className="text-lg font-bold text-center text-black">
            {" "}
            Nivel de actividad física:{" "}
          </Text>
          <TextInput className="border border-black" />
          <Pressable
            style={{
              backgroundColor: "#82E5B5",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text className="">Registrarse</Text>
          </Pressable>
          <View className="flex-row flex-wrap justify-center w-full">
            <Text className="">¿Olvidaste tu contraseña?</Text>
            <Pressable style={{}}>
              {({ pressed }) => (
                <Text
                  style={{
                    color: pressed ? "#219b05" : "#82E5B5",
                  }}
                >
                  Recupérala aquí
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
