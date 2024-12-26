import { requestViewRoutine } from '@/services/api-consumption';
import { useState } from 'react';

export function useRoutines() {
  const [loading, setLoading] = useState(true);

  const handleRoutines = async (token) => {
    try {
      const { routine } = await requestViewRoutine(token);
      return routine;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleRoutines,
  };
}
