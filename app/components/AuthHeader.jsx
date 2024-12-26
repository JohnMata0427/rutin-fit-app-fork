import { Image, View } from 'react-native';
import IconHombre from '../../assets/IconHombre.png';
import IconMujer from '../../assets/IconMujer.png';
import RutinFit from '../../assets/RutinFit.png';

export function AuthHeader() {
  return (
    <View className="flex-row justify-around h-20 border-b-2 border-x-2 rounded-b-xl">
      <Image
        source={IconMujer}
        className="h-full"
        style={{ resizeMode: 'contain' }}
      />
      <Image
        source={RutinFit}
        className="w-32 h-full"
        style={{ resizeMode: 'contain' }}
      />
      <Image
        source={IconHombre}
        className="h-full"
        style={{ resizeMode: 'contain' }}
      />
    </View>
  );
}
