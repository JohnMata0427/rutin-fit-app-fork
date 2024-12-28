import { AuthHeader } from '@/components/AuthHeader';
import { Footer } from '@/components/Footer';
import { InputField } from '@/components/InputField';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { PasswordField } from '@/components/PasswordField';
import { AuthContext } from '@/contexts/AuthProvider';
import { useLogin } from '@/models/useLogin';
import { useProfile } from '@/models/useProfile';
import LoginIcon from '@assets/loginIcon.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';

export function Login({ navigation }) {
  const { handleLogin, setModalVisible, modalVisible, messages, loading } =
    useLogin();
  const { setToken } = useContext(AuthContext);
  const { handleProfile } = useProfile();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLoginPress = async () => {
    const token = await handleLogin(form);
    if (token) {
      await AsyncStorage.setItem('@auth_token', token);
      setToken(token);

      const profile = await handleProfile(token);

      navigation.navigate(profile ? 'Main' : 'ClientData');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexGrow: 1,
        backgroundColor: 'white',
      }}
    >
      <AuthHeader />
      <View
        style={{ shadowColor: '#00ff82', elevation: 20 , shadowRadius: 10 }}
        className="mx-auto w-4/5 items-center gap-y-4 border-primary py-10 rounded-3xl bg-white"
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
          <TouchableOpacity
            className="rounded-md bg-primary p-2.5 flex-row items-center justify-center gap-x-2"
            onPress={handleLoginPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text className="font-bold">Iniciar Sesión</Text>
                <MaterialCommunityIcons name="login" size={20} color="black" />
              </>
            )}
          </TouchableOpacity>
          <ErrorModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            title="Mensaje del sistema"
            messages={messages}
          />
          <View className="m-2 gap-y-1">
            <View className="flex-row justify-center gap-x-1 flex-wrap">
              <Text>¿Olvidaste tu contraseña? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-primary">Recupérala aquí</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center gap-x-1 flex-wrap">
              <Text> ¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-primary">Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
