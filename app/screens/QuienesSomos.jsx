import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EPN from '../../assets/epn.jpg';

export function QuienesSomos({ navigation }) {
  return (
    <View className="bg-slate-300 flex-1">
      <View className="flex-row mt-10 items-center border-b-2 p-2 gap-x-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="border-2 rounded-xl flex-row items-center py-1 px-2 gap-x-2"
        >
          <Ionicons name="arrow-back-circle" size={20} color="black" />
          <Text className="text-center">Volver</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">¿Quienes somos?</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View className="p-3">
          <Text className="text-center">
            Hola, mi nombre es Dustin Joel, soy un estudiante de la universidad
            Escuela Politécnica Nacional
          </Text>
          <Image
            source={EPN}
            className="bg-black w-96 my-4 mx-auto"
            style={{ resizeMode: 'fit' }}
          />
          <Text className="text-center">
            Nací el 19 de Marzo del 2004 en la cuidad de Quito, Ecuador. He
            estudiado desarrollo de software y esta aplicación es mi primer
            proyecto móvil, el cual fue realizado con el propósito de ayudar a
            las personas a tener un control sobre su condición física y mental.
          </Text>
          <Text className="text-xl font-bold text-center mt-4">
            Contáctame:
          </Text>
          <View className="flex-row p-3 justify-center">
            <TouchableOpacity className="items-center gap-y-2">
              <Text> Facebook </Text>
              <Ionicons name="logo-facebook" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center gap-y-2">
              <Text> Correo </Text>
              <MaterialCommunityIcons name="email" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center gap-y-2">
              <Text> Tiktok </Text>
              <Ionicons name="logo-tiktok" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center gap-y-2">
              <Text> Whatsapp </Text>
              <Ionicons name="logo-whatsapp" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
