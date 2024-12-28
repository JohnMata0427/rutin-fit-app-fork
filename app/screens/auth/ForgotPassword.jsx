import { AuthHeader } from '@/components/AuthHeader';
import { Footer } from '@/components/Footer';
import { InputField } from '@/components/InputField';
import { VerificateCodeModal } from '@/components/modals/VerificateCodeModal';
import { useRecoveryPassword } from '@/models/useRecoveryPassword';
import LoginIcon from '@assets/LoginIcon.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function ForgotPassword({ navigation }) {
  const { loading, handleRecoveryPassword, modalVisible, setModalVisible } =
    useRecoveryPassword();
  const [email, setEmail] = useState('');

  const handleSendEmail = async () => {
    const response = await handleRecoveryPassword(email);
    !response &&
      Alert.alert(
        'Mensaje del sistema',
        'Ha ocurrido un error, verifique su correo e intente nuevamente',
      );
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
        className="mx-auto w-4/5 items-center gap-y-4 border-primary py-10 bg-white rounded-3xl"
      >
        <Image source={LoginIcon} className="size-28" resizeMode="contain" />
        <Text className="text-2xl font-extrabold">Recuperar Contraseña</Text>

        <View className="w-3/4">
          <InputField
            label="Correo:"
            placeholder="Ingrese su correo..."
            value={email}
            onChangeText={value => setEmail(value)}
            keyboardType="email"
            iconName="email"
          />
        </View>

        <VerificateCodeModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          email={email}
          navigation={navigation}
          route="NewPassword"
        />

        <TouchableOpacity
          className="w-3/4 flex-row items-center justify-center gap-x-2 rounded-lg bg-primary p-2"
          onPress={handleSendEmail}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Text className="font-bold">Enviar</Text>
              <MaterialCommunityIcons
                name="email-send"
                size={20}
                color="black"
              />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="w-3/4 flex-row items-center justify-center gap-x-2 rounded-lg bg-primary p-2"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="font-bold">Cancelar</Text>
          <MaterialCommunityIcons name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
