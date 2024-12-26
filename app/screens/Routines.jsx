import { AuthContext } from '@/contexts/AuthProvider';
import { useCompletedDays } from '@/models/useCompletedDays';
import { useProgress } from '@/models/useProgress';
import { useRoutines } from '@/models/useRoutines';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export function Routines() {
  const { token } = useContext(AuthContext);

  const { handleRoutines } = useRoutines();
  const { handleProgress } = useProgress();
  const { loading, handleCheckDay } = useCompletedDays();

  const [routines, setRoutines] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [progress, setProgress] = useState({
    currentWeek: 0,
    observations: '',
  });

  const orderOfDays = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
  ];

  const handleCheckDayPress = async (day) => {
    const response = await handleCheckDay(token, day);
    Alert.alert(
      response
        ? 'Felicidades por completar un día de entrenamiento'
        : 'El día que intentas marcar no coincide con el día de entrenamiento actual'
    );
  };

  const handleProgressPress = async () => {
    const response = await handleProgress(token, progress);
    setProgress({ currentWeek: 0, observations: '' });
    response &&
      Alert.alert('Éxito', 'Felicidades, tu progreso ha sido registrado');
  };

  useEffect(() => {
    (async () => {
      const response = await handleRoutines(token);
      setRoutines(response);
    })();
  }, [refresh, token]);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="justify-end items-center h-24 pb-4"
      >
        <Text className="text-2xl font-medium text-center">
          Rutinas Asignadas
        </Text>
      </LinearGradient>
      {routines.length === 0 ? (
        <View className="items-center p-10">
          <FontAwesome5 name="sad-tear" size={24} color="black" />
          <Text className="text-2xl font-bold">No hay rutinas disponibles</Text>
        </View>
      ) : (
        <ScrollView className="flex-1"></ScrollView>
      )}
    </View>
  );
}
