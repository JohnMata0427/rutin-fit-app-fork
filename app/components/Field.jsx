import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function Field({ title, value }) {
  return (
    <View className="m-3 w-3/4 flex-col">
      <View className="flex-row items-center gap-x-2">
        <MaterialCommunityIcons name="star" size={17} color="black" />
        <Text className="text-sm font-bold">{title}</Text>
      </View>
      <View className="rounded-b-2xl border-b-2 border-b-primary">
        <Text className="text-center text-lg">{value}</Text>
      </View>
    </View>
  );
}
