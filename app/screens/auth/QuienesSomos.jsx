import EPN from '@assets/epn.jpeg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Linking } from 'react-native';

export function QuienesSomos({ navigation }) {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexGrow: 1
      }}
    >
      <View className="h-[75] flex-row items-end gap-x-4 border-b-2 p-2 bg-primary">
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="flex-row items-center gap-x-2 rounded-xl border-2 px-2"
        >
          <Ionicons name="arrow-back-circle" size={20} color="black" />
          <Text className="text-center">Volver</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">¿Quienes somos?</Text>
      </View>
      <View className="p-3 flex-1 mt-4">
        <Text className="text-3xl font-bold">¿Quién soy?</Text>
        <Text className="text-justify">
          Hola, mi nombre es Dustin Joel, soy un estudiante de la universidad
          Escuela Politécnica Nacional
        </Text>
        <Image
          source={EPN}
          className="max-w-full bg-black"
          style={{ width: '100%' , height: 200 }}
          resizeMode="cover"
        />
        <Text className="text-justify">
          Nací el 19 de Marzo del 2004 en la cuidad de Quito, Ecuador. He
          estudiado desarrollo de software y esta aplicación es mi primer
          proyecto móvil, el cual fue realizado con el propósito de ayudar a las
          personas a tener un control sobre su condición física y mental.
        </Text>
        <Text className="mt-4 text-3xl font-bold">¿Cómo fue desarrollado este proyecto?</Text>
        <Text className="text-justify">
          El sistema fue desarrollado en conjunto con mis compañeros de clase, para el cuál nos dividimos en 3 secciones, uno para el funcionamiento del sistema, otro para la parte visual que utilizan los entrenadores y por ultimo el diseño de la aplicación móvil que será utilizada por los usuarios.
        </Text>
        <Text className="mt-4 text-center text-xl font-bold">Contáctame:</Text>
        <View className="flex-row justify-evenly p-3">
          <TouchableOpacity className="items-center gap-y-2"
            onPress={() => Linking.openURL('https://www.facebook.com/DustinJMS')}
          >
            <Text> Facebook </Text>
            <Ionicons name="logo-facebook" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="items-center gap-y-2"
            onPress={() => Linking.openURL('mailto:dustin04ms@gmail.com')}
          >
            <Text> Correo </Text>
            <MaterialCommunityIcons name="email" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="items-center gap-y-2"
            onPress={() => Linking.openURL('https://www.tiktok.com/@dustinmsj')}
          >
            <Text> Tiktok </Text>
            <Ionicons name="logo-tiktok" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="items-center gap-y-2"
            onPress={() => Linking.openURL('https://wa.me/593979008923')}
          >
            <Text> Whatsapp </Text>
            <Ionicons name="logo-whatsapp" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
