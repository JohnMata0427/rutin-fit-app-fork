import {
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
} from 'expo-notifications';
import { Alert } from 'react-native';
import { requestSaveNotificationToken } from './api-consumption';

export const registerPushNotifications = async token => {
  try {
    const { status } = await getPermissionsAsync();

    let finalStatus = status;

    if (status !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus === 'granted') {
      const notification_token = await getExpoPushTokenAsync();
      await requestSaveNotificationToken(token, notification_token.data);
    }
  } catch {
    Alert.alert(
      'Mensaje del sistema',
      'Ha ocurrido un error al intentar registrar las notificaciones.',
    );
  }
};
