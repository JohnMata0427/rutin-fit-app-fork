import { requestViewCoachs } from '@/services/api-consumption';
import { useState } from 'react';

export function useCoachs() {
  const [loading, setLoading] = useState(true);

  const handleViewCoachs = async token => {
    try {
      const data = await requestViewCoachs(token);
      return data;
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleViewCoachs,
  };
}
