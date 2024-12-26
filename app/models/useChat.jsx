import { requestChat } from '@/services/api-consumption';

export function useChat() {
  const handleChat = async (token, client_id, coach_id) => {
    try {
      const data = await requestChat(token, client_id, coach_id);
      return data;
    } catch {}
  };

  return { handleChat };
}
