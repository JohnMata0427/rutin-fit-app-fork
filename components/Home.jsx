import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Home(){
    const insets = useSafeAreaInsets();
    return(
        <View style={{ paddingTop: insets.top , paddingBottom: insets.bottom }}>
            <Text>Home</Text>
        </View>
    );
}