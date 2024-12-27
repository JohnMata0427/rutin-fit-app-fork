import { requestCreateProgress } from '@/services/api-consumption';
import { useState } from 'react';

export function useProgress() {
  const [loadingProgress, setLoadingProgress] = useState(false);

  const handleProgress = async (token, form) => {
    setLoadingProgress(true);
    try {
      const { res } = await requestCreateProgress(token, form);
      return res;
    } catch ({ response: { data } }) {
      return data?.res ?? 'Error al resgistrar el progreso, intente de nuevo';
    } finally {
      setLoadingProgress(false);
    }
  };

  return {
    loadingProgress,
    handleProgress,
  };
}
