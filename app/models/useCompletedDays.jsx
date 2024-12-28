import {
  requestCheckDay,
  requestViewCompletedDays,
} from '@/services/api-consumption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export function useCompletedDays() {
  const [loading, setLoading] = useState(false);

  const handleCompletedDays = async token => {
    try {
      const { completedDays } = await requestViewCompletedDays(token);
      await AsyncStorage.setItem(
        '@completedDays',
        JSON.stringify(completedDays),
      );
      return completedDays;
    } catch {
      const savedCompletedDays = await AsyncStorage.getItem('@completedDays');
      if (savedCompletedDays) return JSON.parse(savedCompletedDays);
    }
  };

  const handleCheckDay = async (token, day) => {
    setLoading(true);
    try {
      const { completeDay } = await requestCheckDay(token, day);
      return completeDay;
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { handleCompletedDays, loading, handleCheckDay };
}
