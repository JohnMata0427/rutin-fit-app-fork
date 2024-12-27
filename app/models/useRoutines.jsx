import { requestViewRoutine } from '@/services/api-consumption';

export function useRoutines() {
  const handleRoutines = async token => {
    const { routine } = await requestViewRoutine(token);
    return routine;
  };

  return {
    handleRoutines,
  };
}
