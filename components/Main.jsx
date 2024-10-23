import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import loginIcon from "../assets/loginIcon.png"
export function Main() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View  style={styles.container}>

        <ScrollView>
          <Image
            source={loginIcon}
            style={{ width: 120, height: 100 }}
          />
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>Usuario</Text>
          <TextInput
            placeholder="Ingrese su usuario"
            style={styles.searchInput}
          />
          <Text style={styles.subTitle}>Contraseña</Text>
          <TextInput
          placeholder="Ingrese su contraseña"
          style={styles.searchInput}
          secureTextEntry
           />
           <Pressable style={({pressed}) => [{
            backgroundColor: pressed ? '#0FA05A' : '#82E5B5',
           },

           ]}>
           
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
           </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
