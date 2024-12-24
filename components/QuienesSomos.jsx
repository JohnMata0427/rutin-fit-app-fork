import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import imagenes from "../assets/images.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function QuienesSomos({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row w-full flex-wrap justify-evenly bg-black"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text className="text-white text-center">¿Quienes somos?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="border-2 justify-center border-white rounded-xl"
      >
        <Text className="text-white text-center"> Volver </Text>
      </TouchableOpacity>
    </View>
  );
}
