import { requestLogin } from '@/services/api-consumption';
import { useState } from 'react';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleLogin = async form => {
    setLoading(true);
    try {
      const { token } = await requestLogin(form);
      return token;
    } catch ({ response: { data } }) {
      const errors = data?.errors?.map(({ msg }) => msg);
      setMessages(errors ?? [data?.res]);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    modalVisible,
    messages,
    handleLogin,
    setModalVisible,
  };
}
