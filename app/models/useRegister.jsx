import { useState } from 'react';
import { requestRegister, requestConfigureProfile } from '@/services/api-consumption';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [messages, setMessages] = useState([])
  
  const handleRegister = async (form) => {
    setLoading(true);
    try {
      const data = await requestRegister(form);
      console.log(data);
      return data;
    } catch ({ response: { data }}) {
      const errors = data?.errors?.map(({ msg }) => msg);
      setMessages(errors ?? [data?.res]);
    } finally {
      setLoading(false);
    }
  }

  const handleRegisterInitialData = async (form) => {
    setLoading(true);
    try {
      const data = await requestConfigureProfile(form);
      console.log(data);
      return data;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    modalVisible,
    messages,
    handleRegister,
    handleRegisterInitialData,
    setModalVisible
  }
}