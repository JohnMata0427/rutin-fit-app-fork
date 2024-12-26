import {
  requestCheckDay,
  requestViewCompletedDays,
} from '@/services/api-consumption';
import { useState } from 'react';

export function useCompletedDays() {
  const [loading, setLoading] = useState(true);

  const handleCompletedDays = async (token) => {
    try {
      const { completedDays } = await requestViewCompletedDays(token);
      return completedDays;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckDay = async (token, day) => {
    try {
      const data = await requestCheckDay(token, day);
      return data;
    } catch (error) {
      return error.response.data.res ?? 'Error al marcar el día';
    } finally {
      setLoading(false);
    }
  };

  return { handleCompletedDays, loading, handleCheckDay };
}
