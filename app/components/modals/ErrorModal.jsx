import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function ErrorModal({ visible, onRequestClose, title, messages }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="size-full items-center justify-center bg-black/20">
        <ScrollView
          style={{
            maxHeight: '40%',
            width: '75%',
            borderRadius: 20,
            backgroundColor: 'white',
          }}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text className="text-2xl text-center">{title}</Text>
          <View className="border-black border-2 w-4/5" />
          {messages.map((message, index) => (
            <View key={index} className="flex-row p-4 items-center gap-x-2">
              <MaterialIcons
                name="report-gmailerrorred"
                size={24}
                color="black"
              />
              <Text>{message}</Text>
            </View>
          ))}
          <Pressable
            onPress={onRequestClose}
            className="bg-[#82E5B5] p-3 rounded-md w-1/2"
          >
            <Text className="text-center">Aceptar</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}
