import { useState } from "react";
import { register } from "../services/AuthService";

export function RegisterViewModel() {
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
  
    const [mensajesBack, setMensajesBack] = useState([]);
  
    const [registroExitoso, setRegistroExitoso] = useState(false);

    const handleRegistro = async (name , lastname , email , password) => {
        setLoading(true);
        try{
            const datos = await register(name, lastname, email, password);
            setRegistroExitoso(true);
            return { success: true , datos }
        }catch(error){
            if (error.response && error.response.data.errors) {
                let mensajes = error.response.data.errors.map((error) => error.msg);
                mensajes = mensajes.filter((mensaje) => mensaje !== "Invalid value");
                mensajes = [...new Set(mensajes)];
                setMensajesBack(mensajes);
              } else if (error.response) {
                setMensajesBack([error.response.data.res]);
              } else {
                setMensajesBack(["Error desconocido"]);
              }
              setRegistroExitoso(false);
              setModalVisible(true);
              console.log("Error al registrar", error);
              return {success: false , error};
        } finally{
            setLoading(false);
        }
    }
    return {
        loading,
        handleRegistro,
        modalVisible,
        setModalVisible,
        mensajesBack,
        registroExitoso,
        setMensajesBack
    }
}