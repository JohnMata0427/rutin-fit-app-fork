import { AuthContext } from '@/contexts/AuthProvider';
import { useCoachs } from '@/models/useCoachs';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function CoachsModal({ visible, onPress, form, setForm }) {
  const { token } = useContext(AuthContext);
  const { loading, handleViewCoachs } = useCoachs();
  const [coachs, setCoachs] = useState([]);

  const handleSelectCoach = (coach_id, coach_name) => {
    Alert.alert('Mensaje del sistema', `¿Desea seleccionar a ${coach_name}?`, [
      { text: 'Cancelar' },
      {
        text: 'Aceptar',
        onPress: () => {
          setForm({ ...form, coach_id, coach_name });
          onPress();
        },
      },
    ]);
  };

  useEffect(() => {
    visible &&
      (async () => {
        const response = await handleViewCoachs(token);
        response && setCoachs(response);
      })();
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="size-full items-center justify-center bg-black/20">
        <View className="h-1/2 w-3/4 gap-y-2 rounded-xl bg-white p-4">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={coachs}
              keyExtractor={(_, index) => index}
              renderItem={({ item }) => (
                <View className="my-3 rounded-md bg-slate-200 p-2">
                  <View className="flex-row">
                    <Text className="font-bold"> Nombre: </Text>
                    <Text> {item.user_id.name} </Text>
                  </View>
                  <View className="flex-row">
                    <Text className="font-bold"> Apellido: </Text>
                    <Text> {item.user_id.lastname} </Text>
                  </View>
                  <View className="flex-row">
                    <Text className="font-bold"> Correo: </Text>
                    <Text> {item.user_id.email} </Text>
                  </View>
                  <Text className="font-bold"> Descripción: </Text>
                  <Text> {item.description} </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleSelectCoach(item._id, item.user_id.name)
                    }
                    className="mt-3 rounded-lg bg-primary py-1"
                  >
                    <Text className="text-center font-bold"> Seleccionar </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
