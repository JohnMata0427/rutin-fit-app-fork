import { Linking, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function Footer({ navigation }) {
  return (
    <View className="flex-row items-center justify-evenly bg-black p-2">
      <View className="gap-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('QuienesSomos')}
          className="rounded-xl border-2 border-white p-1"
        >
          <Text className="text-center text-white">¿Quienes somos?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:rutinfit24@gmail.com')}
          className="rounded-xl border-2 border-white p-1"
        >
          <Text className="text-center font-bold text-white">Contáctanos:</Text>
          <Text className="mx-2 text-white">rutinfit24@gmail.com</Text>
        </TouchableOpacity>
      </View>

      <View className="w-1/2 flex-col gap-2">
        <Text className="text-center text-white">
          Siguemos en nuestras redes sociales:
        </Text>
        <View className="flex-row justify-center gap-2">
          <Pressable
            onPress={() =>
              Linking.openURL('https://www.facebook.com/DustinJMS')
            }
          >
            {({ pressed }) => (
              <View className={pressed && 'opacity-50'}>
                <Icon name="logo-facebook" size={30} color={'#ffff'} />
              </View>
            )}
          </Pressable>
          <Pressable>
            {({ pressed }) => (
              <View className={pressed && 'opacity-50'}>
                <Icon name="logo-instagram" size={30} color={'#ffff'} />
              </View>
            )}
          </Pressable>
          <Pressable>
            {({ pressed }) => (
              <View className={pressed && 'opacity-50'}>
                <Icon name="logo-tiktok" size={30} color={'#ffff'} />
              </View>
            )}
          </Pressable>

          <Pressable>
            {({ pressed }) => (
              <View className={pressed && 'opacity-50'}>
                <Icon name="logo-whatsapp" size={30} color={'#ffff'} />
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
