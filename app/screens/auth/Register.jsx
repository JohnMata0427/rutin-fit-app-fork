import { AuthHeader } from '@/components/AuthHeader';
import { Footer } from '@/components/Footer';
import { InputField } from '@/components/InputField';
import { ErrorModal } from '@/components/modals/ErrorModal';
import { VerificateCodeModal } from '@/components/modals/VerificateCodeModal';
import { PasswordField } from '@/components/PasswordField';
import { useRegister } from '@/models/useRegister';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RegistroIcon from '../../../assets/RegistroIcon.png';

export function Register({ navigation }) {
  const { loading, modalVisible, messages, handleRegister, setModalVisible } =
    useRegister();

  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleRegisterPress = async () => {
    const response = await handleRegister(form);
    response && setCodeModalVisible(true);
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
        style={{ shadowColor: '#00ff82', elevation: 20 }}
        className="mx-auto my-5 w-4/5 items-center gap-y-4 border-primary py-10 bg-white rounded-3xl"
      >
        <Image
          source={RegistroIcon}
          className="mx-auto size-28"
          resizeMode="contain"
        />
        <Text className="text-center text-3xl font-extrabold">Registro</Text>
        <View className="w-3/4 gap-y-2">
          <InputField
            label="Nombre:"
            placeholder="Ingrese su nombre..."
            value={form.name}
            iconName="card-account-details"
            onChangeText={value => setForm({ ...form, name: value })}
          />
          <InputField
            label="Apellido:"
            placeholder="Ingrese su apellido..."
            value={form.lastname}
            iconName="card-account-details"
            onChangeText={value => setForm({ ...form, lastname: value })}
          />
          <InputField
            label="Correo:"
            placeholder="Ingrese su correo..."
            value={form.email}
            iconName="email-multiple"
            onChangeText={value => setForm({ ...form, email: value })}
          />
          <PasswordField
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
          />
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-lg bg-primary p-2"
            onPress={handleRegisterPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <MaterialCommunityIcons name="check" size={20} color="black" />
                <Text className="ml-2 font-bold">Registrarme</Text>
              </>
            )}
          </TouchableOpacity>
          <VerificateCodeModal
            visible={codeModalVisible}
            onRequestClose={() => setCodeModalVisible(false)}
            email={form.email}
            navigation={navigation}
          />
          <ErrorModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            title="Mensaje del sistema"
            messages={messages}
          />
          <View className="ustify-center flex-row flex-wrap justify-center">
            <Text> ¿Ya tienes una cuenta? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              {({ pressed }) => (
                <Text className={pressed ? 'text-[#219B05]' : 'text-primary'}>
                  Inicia sesión aquí
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
