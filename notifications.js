import * as Notificatios from "expo-notifications"
import { Alert } from "react-native";
import { tokenNotification } from "./services/AuthService";

export const registrarToken = async (token) => {
    try {
        
        const { status: existingStatus } = await Notificatios.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notificatios.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Mensaje del sistema', 'Por favor habilita el permisos de notificaciones');
            return;
        }

        const tokenN = (await Notificatios.getExpoPushTokenAsync()).data;
         

        await tokenNotification(token, tokenN);
    } catch (error) {
        console.log("Error en registrarToken: ", error);
    }
}