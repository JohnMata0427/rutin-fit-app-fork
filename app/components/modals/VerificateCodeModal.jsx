import { useRegister } from '@/models/useRegister';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Modal, Pressable, Text, TextInput, View } from 'react-native';

export function VerificateCodeModal({
  visible,
  onRequestClose,
  email,
  navigation,
  route = 'Login',
}) {
  const [code, setCode] = useState('');
  const { handleConfirmEmail } = useRegister();

  const handleConfirmEmailPress = async () => {
    const response = await handleConfirmEmail({ email, code });
    if (response) {
      Alert.alert(
        'Mensaje del sistema',
        'Su cuenta ha sido verificada con éxito, puede continuar',
      );
      onRequestClose();
      navigation.navigate(route, { email });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View className="size-full items-center justify-center bg-black/20">
        <View className="gap-y-2 rounded-2xl bg-white p-8">
          <Text className="text-center text-2xl font-bold">
            Se envió un codigo de verificación a tu correo:
          </Text>
          <Text className="text-center text-red-700">
            El código expira en 2 minutos
          </Text>
          <TextInput
            placeholder="Codigo de verificacion"
            keyboardType="numeric"
            className="border-b-2 text-center"
            onChangeText={value => setCode(value)}
          />

          <Pressable
            onPress={handleConfirmEmailPress}
            className="flex-row items-center justify-center gap-x-2 rounded-lg bg-primary p-2"
          >
            <Text className="font-bold">Verificar</Text>
            <MaterialCommunityIcons name="security" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
