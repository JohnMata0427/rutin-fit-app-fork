import EPN from '@assets/epn.jpg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function QuienesSomos({ navigation }) {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexGrow: 1,
        paddingTop: top,
      }}
    >
      <View className="mt-4 flex-row items-center gap-x-2 border-b-2 p-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="flex-row items-center gap-x-2 rounded-xl border-2 px-2 py-1"
        >
          <Ionicons name="arrow-back-circle" size={20} color="black" />
          <Text className="text-center">Volver</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">¿Quienes somos?</Text>
      </View>
      <View className="p-3 flex-1 mt-4">
        <Text className="text-center">
          Hola, mi nombre es Dustin Joel, soy un estudiante de la universidad
          Escuela Politécnica Nacional
        </Text>
        <Image
          source={EPN}
          className="mx-auto my-4 w-96 bg-black"
          resizeMode="contain"
        />
        <Text className="text-center">
          Nací el 19 de Marzo del 2004 en la cuidad de Quito, Ecuador. He
          estudiado desarrollo de software y esta aplicación es mi primer
          proyecto móvil, el cual fue realizado con el propósito de ayudar a las
          personas a tener un control sobre su condición física y mental.
        </Text>
        <Text className="mt-4 text-center text-xl font-bold">Contáctame:</Text>
        <View className="flex-row justify-center p-3">
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
  );
}
