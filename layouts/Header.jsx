import React from "react";
import { View, Image } from "react-native";
import imagenes from "../assets/images.js";

const Header = () => {
  return (
    <View className="flex flex-row justify-around h-20 border-b-2 rounded-b-xl border-x">
      <Image
        source={imagenes.IconMujer}
        className="h-full max-h-full "
        style={{ resizeMode: "contain" }}
      />
      <Image
        source={imagenes.RutinFit}
        className="h-full max-h-full w-24"
        style={{ resizeMode: "contain" }}
      />
      <Image
        source={imagenes.IconHombre}
        className="h-full max-h-full "
        style={{ resizeMode: "contain" }}
      />
    </View>
  );
};
export default Header;
