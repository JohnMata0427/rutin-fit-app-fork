import { AuthHeader } from '@/components/AuthHeader';
import { Footer } from '@/components/Footer';
import { InputField } from '@/components/InputField';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { PasswordField } from '@/components/PasswordField';
import { AuthContext } from '@/contexts/AuthProvider';
import { useLogin } from '@/models/useLogin';
import LoginIcon from '@assets/LoginIcon.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

export function Login({ navigation }) {
  const { handleLogin, setModalVisible, modalVisible, messages, loading } =
    useLogin();
  const { setToken, auth } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLoginPress = async () => {
    const token = await handleLogin(form);
    if (token) {
      await AsyncStorage.setItem('@auth_token', token);
      setToken(token);

      navigation.navigate(auth ? 'Main' : 'ClientData');
    }
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
        <Text className="text-3xl font-extrabold">Login</Text>
        <View className="w-3/4 gap-y-2">
          <InputField
            label="Usuario:"
            placeholder="Ingrese su usuario..."
            value={form.email}
            iconName="email"
            onChangeText={value => setForm({ ...form, email: value })}
            keyboardType="email"
          />
          <PasswordField
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
          />
          <Pressable
            className="rounded-md bg-primary p-2.5"
            onPress={handleLoginPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <View className="flex-row items-center justify-center">
                <Text className="mx-2 font-bold">Iniciar Sesión</Text>
                <MaterialCommunityIcons name="login" size={20} color="black" />
              </View>
            )}
          </Pressable>
          <ErrorModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            title="Mensaje del sistema"
            messages={messages}
          />
          <View className="m-2 gap-y-1">
            <View className="flex-row justify-center gap-x-1">
              <Text>¿Olvidaste tu contraseña? </Text>
              <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                {({ pressed }) => (
                  <Text className={pressed ? 'text-[#219B05]' : 'text-primary'}>
                    Recupérala aquí
                  </Text>
                )}
              </Pressable>
            </View>
            <View className="flex-row justify-center gap-x-1">
              <Text> ¿No tienes cuenta? </Text>
              <Pressable onPress={() => navigation.navigate('Register')}>
                {({ pressed }) => (
                  <Text className={pressed ? 'text-[#219B05]' : 'text-primary'}>
                    Regístrate aquí
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
