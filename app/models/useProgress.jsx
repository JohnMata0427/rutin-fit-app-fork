import { requestCreateProgress } from '@/services/api-consumption';
import { useState } from 'react';

export function useProgress() {
  const [loading, setLoading] = useState(true);

  const handleProgress = async (token, form) => {
    try {
      const data = await requestCreateProgress(token, form);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleProgress,
  };
}
