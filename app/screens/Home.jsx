import { AuthContext } from '@/contexts/AuthProvider';
import { useCompletedDays } from '@/models/useCompletedDays';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

export function Home() {
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
        className="flex-row justify-center items-end h-24 pb-4 gap-x-2"
      >
        <Text className="text-2xl font-medium">Progreso Diario</Text>
        <FontAwesome6 name="calendar-days" size={20} color="black" />
      </LinearGradient>
      <FlatList
        data={completedDays}
        contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item: { day, date } }) => (
          <View className="flex-row border-black border-2 justify-evenly rounded-2xl mt-4 bg-[#82E5B5] p-2 w-4/5">
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
