import { actualizarPerfil } from "../services/AuthService";
import { useState } from "react";

export function ActualizarPerfilViewModel() {

  const [ mensajesBack , setMensajesBack ] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const handleUpdateProfile = async (
    token,
    name,
    lastname,
    email,
    genre,
    weight,
    height,
    age,
    levelactivity,
    days
  ) => {
    try {
      const datos = await actualizarPerfil(
        token,
        name,
        lastname,
        email,
        genre,
        weight,
        height,
        age,
        levelactivity,
        days
      );
      return { success: true, datos };
    } catch (error) {
      if (error.response && error.response.data.res) {
        setMensajesBack([error.response.data.res]);
        
      } else {
        setMensajesBack(["Error desconocido"])
      }
      setModalVisible(true)
      return { success: false, error };
    }
  };
  return { handleUpdateProfile , mensajesBack , modalVisible, setModalVisible , setMensajesBack};
}
