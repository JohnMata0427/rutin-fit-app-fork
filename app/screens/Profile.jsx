import { Field } from '@/components/Field';
import { AuthContext } from '@/contexts/AuthProvider';
import { useProfile } from '@/models/useProfile';
import { registerPushNotifications } from '@/services/notifications';
import { capitalize, orderOfDays } from '@/utils/utils';
import PerfilFemenino from '@assets/perfilFemenino.webp';
import PerfilMasculino from '@assets/perfilMasculino.webp';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { getPermissionsAsync } from 'expo-notifications';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function Profile({ navigation }) {
  const { handleProfile, loading } = useProfile();
  const { auth, token, setAuth, setToken } = useContext(AuthContext);
  const [sendNotification, setSendNotification] = useState(false);

  const handleChangeNotification = async send => {
    setSendNotification(send);
    if (!sendNotification) await registerPushNotifications();
  };

  const refreshProfile = async () => {
    try {
      const profile = await handleProfile(token);
      profile && setAuth(profile);
    } catch {}
  };

  const requestLogout = () => {
    Alert.alert(
      'Mensaje del sistema',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar' },
        {
          text: 'Aceptar',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.navigate('Login');
            setToken('');
            setAuth(null);
          },
        },
      ],
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await getPermissionsAsync();
      setSendNotification(status === 'granted');
    })();
  }, []);

  return (
    <View className="h-full">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="h-52 items-center justify-end pb-2"
      >
        <Image
          source={
            auth?.genre === 'masculino' ? PerfilMasculino : PerfilFemenino
          }
          className="size-36 rounded-full bg-white"
          resizeMode="contain"
        />
      </LinearGradient>
      <ScrollView
        className="m-2 flex-1"
        contentContainerStyle={{ justifyContent: 'center' }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshProfile} />
        }
      >
        <View className="items-center">
          <View className="mb-3 w-full flex-row items-center justify-evenly">
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateProfile')}
              className="flex-row items-center gap-x-2"
            >
              <Text className="text-center text-xl font-bold">
                Editar Perfil
              </Text>
              <MaterialCommunityIcons
                name="book-edit"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <View className="flex-row items-center">
              <Text className="text-xl font-bold">Notificaciones: </Text>
              <Switch
                value={sendNotification}
                onValueChange={handleChangeNotification}
              />
            </View>
          </View>
          <Field title="Nombre:" value={auth?.user_id?.name} />
          <Field title="Apellido:" value={auth?.user_id?.lastname} />
          <Field title="Correo:" value={auth?.user_id?.email} />
          <Field title="Género:" value={capitalize(auth?.genre)} />
          <Field title="Peso:" value={auth?.weight + ' kg'} />
          <Field title="Altura:" value={auth?.height + ' cm'} />
          <Field title="Edad:" value={auth?.age + ' años'} />
          <Field
            title="Nivel de actividad:"
            value={capitalize(auth?.levelactivity)}
          />
          <Field
            title="Días de entrenamiento:"
            value={auth?.days
              ?.sort((a, b) => orderOfDays.indexOf(a) - orderOfDays.indexOf(b))
              .map(day => capitalize(day))
              .join(' - ')}
          />
        </View>
        <TouchableOpacity
          onPress={requestLogout}
          className="flex-row items-center justify-center gap-x-2 rounded-xl bg-primary p-2"
        >
          <Text className="font-bold"> Cerrar sesión </Text>
          <MaterialCommunityIcons
            name="location-exit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
