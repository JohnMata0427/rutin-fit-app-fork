import {
  requestUpdateProfile,
  requestViewProfile,
} from '@/services/api-consumption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export function useProfile() {
  const [loading, setLoading] = useState(false);

  const handleProfile = async (token, connected) => {
    setLoading(true);
    try {
      const { client } = connected && (await requestViewProfile(token));
      await AsyncStorage.setItem('@profile', JSON.stringify(client));
      return client;
    } catch {
      const savedProfile = await AsyncStorage.getItem('@profile');
      if (savedProfile) return JSON.parse(savedProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (token, form) => {
    setLoading(true);
    try {
      const data = await requestUpdateProfile(token, form);
      return data;
    } catch {
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
