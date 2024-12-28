import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

export function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  iconName = 'account-edit',
  multiline = false,
  editable = true,
  keyboardType = 'default',
}) {
  return (
    <>
      <View className="flex-row items-center gap-x-2">
        <MaterialCommunityIcons name={iconName} size={20} color="black" />
        <Text className="font-bold">{label}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        className="border-b-2"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        editable={editable}
        keyboardType={keyboardType}
      />
    </>
  );
}
