import { AuthContext } from '@/contexts/AuthProvider';
import { useProfile } from '@/models/useProfile';
import { registerPushNotifications } from '@/services/notifications';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { getPermissionsAsync } from 'expo-notifications';
import { capitalize, orderOfDays } from '@/utils/utils';
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
import Perfil from '../../assets/Perfil.jpg';

export function Profile({ navigation }) {
  const { handleProfile } = useProfile();
  const { auth, token, setAuth } = useContext(AuthContext);
  const [sendNotification, setSendNotification] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleChangeNotification = async send => {
    setSendNotification(send);
    if (!sendNotification) await registerPushNotifications();
  };

  const refreshProfile = async () => {
    setRefresh(true);
    try {
      const profile = await handleProfile(token);
      profile && setAuth(profile);
    } finally {
      setRefresh(false);
    }
  };

  const requestLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
          } catch {}
        },
      },
    ]);
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
          source={Perfil}
          className="size-36 rounded-full bg-white"
          resizeMode="contain"
        />
      </LinearGradient>
      <ScrollView
        className="m-2 flex-1"
        contentContainerStyle={{ justifyContent: 'center' }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refreshProfile} />
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
              <AntDesign name="edit" size={24} color="black" />
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
          <Field title="Género:" value={capitalize(auth.genre)} />
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

function Field({ title, value }) {
  return (
    <View className="m-3 w-3/4 flex-col">
      <View className="flex-row items-center gap-x-2">
        <AntDesign name="star" size={17} color="black" />
        <Text className="text-sm font-bold">{title}</Text>
      </View>
      <View className="rounded-b-2xl border-b-2 border-b-primary">
        <Text className="text-center text-lg">{value}</Text>
      </View>
    </View>
  );
}
