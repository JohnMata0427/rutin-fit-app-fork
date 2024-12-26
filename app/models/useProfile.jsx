import { useState } from 'react';
import { requestViewProfile } from '@/services/api-consumption';

export function useProfile() {
  const [loading, setLoading] = useState(true);

  const handleProfile = async (token) => {
    try {
      const { client } = await requestViewProfile(token);
      return client;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleProfile,
    loading,
  };
}
