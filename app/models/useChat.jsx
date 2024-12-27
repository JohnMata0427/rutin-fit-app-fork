import { requestChat } from '@/services/api-consumption';

export function useChat() {
  const handleChat = async (token, client_id, coach_id, page) => {
    try {
      const { chat } = await requestChat(token, client_id, coach_id, page);
      return chat;
    } catch {}
  };

  return { handleChat };
}
