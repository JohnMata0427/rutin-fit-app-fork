import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import imagenes from "../assets/images";

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
      <ScrollView className="w-full h-full">
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
            className="bg-[#82E5B5]"
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
              resizeMode: "contain"
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
