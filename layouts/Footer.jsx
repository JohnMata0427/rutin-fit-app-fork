import { Shadow } from "react-native-shadow-2";
import { View, Text, Pressable, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Footer = () => {
  return (
    <Shadow
      className="bg-black rounded-t-xl flex-row p-1 max-w-full w-full"
      distance={9}
      startColor={"#00000030"}
      offset={[10, 0]}
    >
      <View className="flex-row w-full flex-wrap justify-center">
        <View className="flex-wrap max-w-[175px] flex justify-around">
          <Text className="text-white text-center"> ¿Quienes somos?</Text>
          <Text className="text-white text-center"> Contáctanos: </Text>
          <Pressable
            onPress={() => Linking.openURL("mailto:rutinfit24@gmail.com")}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "white" : "transparent",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              padding: 3,
            })}
          >
            {({ pressed }) => (
              <Text
                style={{
                  color: pressed ? "black" : "white",
                  textAlign: "center",
                }}
              >
                rutinfit24@gmail.com
              </Text>
            )}
          </Pressable>
        </View>
        <View className="flex flex-col max-w-[200px]">
          <Text className="text-center text-white mb-1 flex flex-wrap">
            
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
                  <Icon name="logo-twitter" size={30} color={"#ffff"} />
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
                opacity: pressed ? 0.5 : 1,
              })}
            >
              {({ pressed }) => (
                <View style={{ opacity: pressed ? 0.5 : 1 }}>
                  <Icon name="logo-youtube" size={30} color={"#ffff"} />
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
    </Shadow>
  );
};
export default Footer;
