import {
  requestConfigureProfile,
  requestConfirmEmail,
  requestRegister,
} from '@/services/api-consumption';
import { useState } from 'react';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleRegister = async form => {
    setLoading(true);
    try {
      const data = await requestRegister(form);
      return data;
    } catch ({ response: { data } }) {
      const errors = data?.errors?.map(({ msg }) => msg);
      setMessages(errors ?? [data?.res]);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEmail = async form => {
    setLoading(true);
    try {
      const data = await requestConfirmEmail(form);
      return data;
    } catch ({ response: { data } }) {
      const errors = data?.errors?.map(({ msg }) => msg);
      setMessages(errors ?? [data?.res]);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterInitialData = async (token, form) => {
    setLoading(true);
    try {
      const { newClient } = await requestConfigureProfile(token, form);
      return newClient;
    } catch ({ response: { data } }) {
      setMessages([data?.res]);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    modalVisible,
    messages,
    handleRegister,
    handleConfirmEmail,
    handleRegisterInitialData,
    setModalVisible,
  };
}
