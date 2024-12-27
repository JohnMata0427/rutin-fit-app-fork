import { AuthHeader } from '@/components/AuthHeader';
import { Footer } from '@/components/Footer';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { useLogin } from '@/models/useLogin';
import { useProfile } from '@/models/useProfile';
import { registerPushNotifications } from '@/services/notifications';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginIcon from '../../assets/LoginIcon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthProvider';

export function Login({ navigation }) {
  const insets = useSafeAreaInsets();
  const { handleProfile } = useProfile();
  const { handleLogin, setModalVisible, modalVisible, messages, loading } =
    useLogin();
  const { setToken, setAuth } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLoginPress = async () => {
    const token = await handleLogin(form);
    if (token) {
      try {
        await AsyncStorage.setItem('@auth_token', token);
        setToken(token);

        const profile = await handleProfile(token);

        if (profile) {
          await AsyncStorage.setItem('@profile', JSON.stringify(profile));
          setAuth(profile);
        }
        
        navigation.navigate(profile ? 'Main' : 'Datos');
        await registerPushNotifications(token);
      } catch (error){ console.log(error)}
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="h-full flex-col justify-between"
    >
      <AuthHeader />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
        <View
          style={{ shadowColor: '#00ff82', elevation: 20 }}
          className="mx-auto my-5 w-4/5 items-center gap-y-4 border-primary p-10"
        >
          <Image source={LoginIcon} className="size-28" resizeMode="contain" />
          <Text className="text-4xl font-extrabold">Login</Text>
          <View className="gap-y-2">
            <View className="flex-row items-center gap-x-2">
              <FontAwesome name="user-circle" size={20} color="black" />
              <Text className="font-bold">Usuario:</Text>
            </View>
            <TextInput
              placeholder="Ingrese su usuario"
              className="border-b-2"
              value={form.email}
              onChangeText={value => setForm({ ...form, email: value })}
              autoCapitalize="none"
            />
            <View className="flex-row items-center gap-x-2">
              <MaterialIcons name="lock" size={20} color="black" />
              <Text className="font-bold">Contraseña:</Text>
            </View>
            <View className="relative">
              <TextInput
                placeholder="Ingrese su contraseña"
                className="border-b-2"
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={value => setForm({ ...form, password: value })}
              />
              <TouchableOpacity
                className="absolute right-2 top-2"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} />
              </TouchableOpacity>
            </View>
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
                  <AntDesign name="login" size={20} color="black" />
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
                <Pressable
                  onPress={() => navigation.navigate('OlvidarPassword')}
                >
                  {({ pressed }) => (
                    <Text
                      className={pressed ? 'text-[#219B05]' : 'text-primary'}
                    >
                      Recupérala aquí
                    </Text>
                  )}
                </Pressable>
              </View>
              <View className="flex-row justify-center gap-x-1">
                <Text> ¿No tienes cuenta? </Text>
                <Pressable onPress={() => navigation.navigate('Registro')}>
                  {({ pressed }) => (
                    <Text
                      className={pressed ? 'text-[#219B05]' : 'text-primary'}
                    >
                      Regístrate aquí
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Footer navigation={navigation} />
    </View>
  );
}
