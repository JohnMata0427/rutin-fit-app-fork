import { Image, View } from 'react-native';
import IconHombre from '../../assets/IconHombre.png';
import IconMujer from '../../assets/IconMujer.png';
import RutinFit from '../../assets/RutinFit.png';

export function AuthHeader() {
  return (
    <View className="h-20 flex-row justify-around rounded-b-xl border-x-2 border-b-2">
      <Image source={IconMujer} className="h-full" resizeMode="contain" />
      <Image source={RutinFit} className="h-full w-32" resizeMode="contain" />
      <Image source={IconHombre} className="h-full" resizeMode="contain" />
    </View>
  );
}
