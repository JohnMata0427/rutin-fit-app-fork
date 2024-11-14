import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

export function Perfil() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="w-full h-full"
    >
      <LinearGradient colors={["#82E5B5", "#334155"]} className="border-b-2 border-black">
        <View
          style={{
            maxWidth: "100%",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 200,
          }}
          className="w-full h-full"
        >
          <View
            className=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
            }}
          ></View>
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
        className=""
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View className="flex items-center space-y-5">
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text className="text-lg">Nombre:</Text>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text className="text-lg">Nombre:</Text>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text className="text-lg">Nombre:</Text>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text className="text-lg">Nombre:</Text>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text className="text-lg">Nombre:</Text>
          </View>
          <View
            className="border-[#82E5B5] border-2 rounded-2xl flex-row justify-center items-center"
            style={{ width: "80%" }}
          >
            <AntDesign name="user" size={24} color="black" />
            <Text className="text-lg">Nombre:</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
