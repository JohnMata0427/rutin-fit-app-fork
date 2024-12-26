import { View, Text, Pressable, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function Footer({ navigation }) {
  return (
    <View className="flex-row justify-evenly items-center bg-black p-2">
      <View className="gap-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('QuienesSomos')}
          className="p-1 border-2 border-white rounded-xl"
        >
          <Text className="text-white text-center">¿Quienes somos?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:rutinfit24@gmail.com')}
          className="p-1 border-2 border-white rounded-xl"
        >
          <Text className="text-white font-bold text-center">Contáctanos:</Text>
          <Text className="text-white mx-2">rutinfit24@gmail.com</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col w-1/2 gap-2">
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
