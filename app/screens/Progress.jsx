import { AuthContext } from '@/contexts/AuthProvider';
import { useCompletedDays } from '@/models/useCompletedDays';
import { Ionicons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

export function Progress() {
  const { handleCompletedDays } = useCompletedDays();
  const { token } = useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await handleCompletedDays(token);
      setCompletedDays(response);
      setLoading(false);
    })();
  }, [refresh, token]);

  return (
    <View className="h-full">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="h-24 flex-row items-end justify-center gap-x-2 pb-4"
      >
        <Text className="text-2xl font-medium">Progreso Diario</Text>
        <FontAwesome6 name="calendar-days" size={20} color="black" />
      </LinearGradient>
      <FlatList
        data={completedDays}
        contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item: { day, date } }) => (
          <View className="mt-4 w-4/5 flex-row justify-evenly rounded-2xl border-2 border-black bg-primary p-2">
            <View>
              <Text>Día: {day}</Text>
              <Text>Fecha: {new Date(date).toLocaleDateString()}</Text>
            </View>
            <View className="border"></View>
            <View className="flex-row items-center gap-2">
              <Text>Completado</Text>
              <Ionicons name="happy-sharp" size={24} color="black" />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center p-10">
            <FontAwesome5 name="sad-tear" size={24} color="black" />
            <Text className="text-2xl font-bold">No hay días completados</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              setRefresh(!refresh);
            }}
          />
        }
      />
    </View>
  );
}