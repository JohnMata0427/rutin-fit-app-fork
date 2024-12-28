import { capitalize } from '@/utils/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';

export function SelectField({
  label,
  selectedValue,
  onValueChange,
  values,
  iconName = 'account-edit',
}) {
  return (
    <>
      <View className="flex-row items-center gap-x-2">
        <MaterialCommunityIcons name={iconName} size={20} color="black" />
        <Text className="font-bold">{label}</Text>
      </View>
      <View className="border-b-2">
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {values?.map(value => (
            <Picker.Item key={value} label={capitalize(value)} value={value} />
          ))}
        </Picker>
      </View>
    </>
  );
}
