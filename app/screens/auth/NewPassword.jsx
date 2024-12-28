import { AuthHeader } from '@/components/AuthHeader';
import { Footer } from '@/components/Footer';
import { PasswordField } from '@/components/PasswordField';
import { useRecoveryPassword } from '@/models/useRecoveryPassword';
import LoginIcon from '@assets/LoginIcon.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

export function NewPassword({ navigation, route }) {
  const { loading, handleNewPassword, message } = useRecoveryPassword();
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
    email: route.params.email,
  });

  const handleNewPasswordPress = async () => {
    console.log(form);
    const response = await handleNewPassword(form);
    Alert.alert('Mensaje del sistema', response || message);
    response && navigation.navigate('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexGrow: 1,
      }}
    >
      <AuthHeader />
      <View
        style={{ shadowColor: '#00ff82', elevation: 20 }}
        className="mx-auto w-4/5 items-center gap-y-4 border-primary py-10"
      >
        <Image source={LoginIcon} className="size-28" resizeMode="contain" />
        <Text className="text-3xl font-extrabold">Nueva Contraseña</Text>

        <View className="w-3/4 gap-y-4">
          <View>
            <PasswordField
              value={form.password}
              onChangeText={value => setForm({ ...form, password: value })}
            />
          </View>
          <View>
            <PasswordField
              value={form.confirmPassword}
              onChangeText={value =>
                setForm({ ...form, confirmPassword: value })
              }
            />
          </View>
        </View>

        <Pressable
          onPress={handleNewPasswordPress}
          className="flex-row items-center justify-center gap-x-2 rounded-lg bg-primary p-2"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text className="font-bold">Actualizar Contraseña</Text>
              <MaterialCommunityIcons name="security" size={20} color="black" />
            </>
          )}
        </Pressable>
      </View>
      <Footer />
    </ScrollView>
  );
}
