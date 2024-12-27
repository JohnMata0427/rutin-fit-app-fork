import { useState } from 'react';
import {
  requestViewProfile,
  requestUpdateProfile,
} from '@/services/api-consumption';

export function useProfile() {
  const [loading, setLoading] = useState(false);

  const handleProfile = async token => {
    const { client } = await requestViewProfile(token);
    return client;
  };

  const handleUpdateProfile = async (token, form) => {
    setLoading(true);
    try {
      const data = await requestUpdateProfile(token, form);
      return data;
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleProfile,
    handleUpdateProfile,
    loading,
  };
}
