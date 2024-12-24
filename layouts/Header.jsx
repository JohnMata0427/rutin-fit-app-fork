import React from "react";
import { View, Image } from "react-native";
import imagenes from "../assets/images.js";

const Header = () => {
  return (
    <View
      className="bg-white"
      style={{
        shadowColor: "#000",
        elevation: 25,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        height: 100,
        justifyContent: "flex-end",
      }}
    >
      <View className="flex-row justify-around items-center" style={{ width: "100%", height: "80%" }}>
        <Image
          source={imagenes.IconMujer}
          className="h-20 w-20 bg-white"
          style={{ resizeMode: "contain" }}
        />
        <Image
          source={imagenes.RutinFit}
          className="max-h-full w-24 bg-white"
          style={{ resizeMode: "contain" }}
        />
        <Image
          source={imagenes.IconHombre}
          className="h-20 w-20 bg-white"
          style={{ resizeMode: "contain" }}
        />
      </View>
    </View>
  );
};
export default Header;
