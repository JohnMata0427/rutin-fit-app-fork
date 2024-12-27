import {
  requestCheckDay,
  requestViewCompletedDays,
} from '@/services/api-consumption';
import { useState } from 'react';

export function useCompletedDays() {
  const [loading, setLoading] = useState(false);

  const handleCompletedDays = async token => {
    try {
      const { completedDays } = await requestViewCompletedDays(token);
      return completedDays;
    } catch {}
  };

  const handleCheckDay = async (token, day) => {
    setLoading(true);
    try {
      const { completeDay } = await requestCheckDay(token, day);
      return completeDay;
    } finally {
      setLoading(false);
    }
  };

  return { handleCompletedDays, loading, handleCheckDay };
}
