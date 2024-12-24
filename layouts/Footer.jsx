import { View, Text, Pressable, Linking, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row w-full flex-wrap justify-evenly bg-black"
    style={{
      shadowColor: "#000",
      elevation: 20,
      shadowOffset: { width: 0, height: -1 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    }}
    >
      <View className="flex-wrap justify-around gap-2 m-1">
        <TouchableOpacity
          onPress={() => navigation.navigate("QuienesSomos")}
          className="border-2 border-white rounded-xl"
        >
          <Text className="text-white text-center"> ¿Quienes somos?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:rutinfit24@gmail.com")}
          className="border-2 justify-center border-white rounded-xl"
        >
          <Text className="text-white font-bold"> Contáctanos: </Text>
          <Text className="text-white text-center"> rutinfit24@gmail.com </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-col max-w-[200px]">
        <Text className="text-center text-white mb-1 flex-wrap">
          Siguemos en nuestras redes sociales:
        </Text>
        <View className="flex flex-row flex-wrap justify-center gap-2">
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.facebook.com/DustinJMS")
            }
          >
            {({ pressed }) => (
              <View style={{ opacity: pressed ? 0.5 : 1 }}>
                <Icon name="logo-facebook" size={30} color={"#ffff"} />
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            {({ pressed }) => (
              <View style={{ opacity: pressed ? 0.5 : 1 }}>
                <Icon name="logo-instagram" size={30} color={"#ffff"} />
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            {({ pressed }) => (
              <View style={{ opacity: pressed ? 0.5 : 1 }}>
                <Icon name="logo-tiktok" size={30} color={"#ffff"} />
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL("")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.1 : 1,
            })}
          >
            {({ pressed }) => (
              <View style={{ opacity: pressed ? 0.5 : 1 }}>
                <Icon name="logo-whatsapp" size={30} color={"#ffff"} />
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Footer;
