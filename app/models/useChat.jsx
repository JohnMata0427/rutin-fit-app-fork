import { requestChat } from '@/services/api-consumption';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useChat() {
  const handleChat = async (token, client_id, coach_id, page) => {
    try {
      const { chat } = await requestChat(token, client_id, coach_id, page);
      await AsyncStorage.setItem('@chat', JSON.stringify(chat));
      return chat;
    } catch {
      const savedChat = await AsyncStorage.getItem('@chat');
      if (savedChat) return JSON.parse(savedChat);
    }
  };

  return { handleChat };
}
