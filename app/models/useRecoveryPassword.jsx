import {
  requestNewPassword,
  requestRecoveryPassword,
} from '@/services/api-consumption';
import { useState } from 'react';

export function useRecoveryPassword() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleRecoveryPassword = async email => {
    setLoading(true);
    try {
      const data = await requestRecoveryPassword(email);
      setModalVisible(true);
      return data;
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleNewPassword = async form => {
    setLoading(true);
    try {
      const { res } = await requestNewPassword(form);
      return res;
    } catch (error) {
      setMessage(error.response.data.res);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    modalVisible,
    message,
    setModalVisible,
    handleNewPassword,
    handleRecoveryPassword,
  };
}
