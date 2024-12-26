import { AuthContext } from '@/contexts/AuthProvider';
import { useProfile } from '@/models/useProfile';
import { registerPushNotifications } from '@/services/notifications';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { getPermissionsAsync } from 'expo-notifications';
import { useCallback, useContext, useEffect, useState } from 'react';
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
  const orderOfDays = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
  ];

  const handleChangeNotification = async (send) => {
    setSendNotification(send);
    if (!sendNotification) await registerPushNotifications();
  };

  const capitalize = useCallback(
    (string) => string?.charAt(0).toUpperCase() + string?.slice(1)
  );

  const refreshProfile = async () => {
    setRefresh(true);
    const profile = await handleProfile(token);
    profile && setAuth(profile);
    setRefresh(false);
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
        style={{
          height: 200,
        }}
        className="justify-end items-center pb-2"
      >
        <Image
          source={Perfil}
          style={{
            width: 150,
            height: 150,
            backgroundColor: '#ffff',
            borderRadius: 9999,
            resizeMode: 'contain',
          }}
        />
      </LinearGradient>
      <ScrollView
        className="flex-1 m-2"
        contentContainerStyle={{ justifyContent: 'center' }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refreshProfile} />
        }
      >
        <View className="items-center">
          <View className="flex-row items-center w-full justify-evenly mb-3">
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateProfile')}
              className="flex-row items-center gap-x-2"
            >
              <Text className="text-3xl font-bold text-center">
                Editar Perfil
              </Text>
              <AntDesign name="edit" size={25} color="black" />
            </TouchableOpacity>
            <View className="flex-row items-center">
              <Text className="font-bold">Notificaciones: </Text>
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
              .map((day) => capitalize(day))
              .join(' - ')}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#82E5B5',
            padding: 10,
          }}
          onPress={requestLogout}
          className="flex-row items-center justify-center gap-x-2"
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
    <View className="flex-col w-3/4 m-3">
      <View className="flex-row gap-x-2 items-center">
        <AntDesign name="star" size={17} color="black" />
        <Text className="text-sm font-bold">{title}</Text>
      </View>
      <View className="border-b-2 border-b-[#82E5B5] rounded-b-2xl">
        <Text className="text-lg text-center">{value}</Text>
      </View>
    </View>
  );
}
