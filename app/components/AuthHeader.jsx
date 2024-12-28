import IconHombre from '@assets/IconHombre.png';
import IconMujer from '@assets/IconMujer.png';
import RutinFit from '@assets/RutinFit.png';
import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AuthHeader() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: top }}
      className="h-24 flex-row justify-around rounded-b-xl border-x-2 border-b-2"
    >
      <Image source={IconMujer} className="h-full" resizeMode="contain" />
      <Image source={RutinFit} className="h-full w-32" resizeMode="contain" />
      <Image source={IconHombre} className="h-full" resizeMode="contain" />
    </View>
  );
}
