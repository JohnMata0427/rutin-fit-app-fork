import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export function PasswordField({ value, onChangeText }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <View className="flex-row items-center gap-x-2">
        <MaterialCommunityIcons name="lock" size={20} color="black" />
        <Text className="font-bold">Contraseña:</Text>
      </View>
      <View className="relative">
        <TextInput
          placeholder="Ingrese su contraseña"
          className="border-b-2"
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          className="absolute right-2 top-2"
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
