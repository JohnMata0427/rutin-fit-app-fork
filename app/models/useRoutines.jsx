import { requestViewRoutine } from '@/services/api-consumption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export function useRoutines() {
  const [loadingRoutines, setLoadingRoutines] = useState(true);

  const handleRoutines = async (token, connected) => {
    try {
      const { routine } = connected && (await requestViewRoutine(token));
      await AsyncStorage.setItem('@routines', JSON.stringify(routine));
      return routine;
    } catch {
      const savedRoutines = await AsyncStorage.getItem('@routines');
      if (savedRoutines) return JSON.parse(savedRoutines);
    } finally {
      setLoadingRoutines(false);
    }
  };

  return {
    loadingRoutines,
    setLoadingRoutines,
    handleRoutines,
  };
}
