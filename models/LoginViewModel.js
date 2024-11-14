import { useState } from "react";
import { login } from "../services/AuthService";

export function useLoginViewModel() {
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
  
    const [mensajesBack, setMensajesBack] = useState([]);
  
    const [loginExitoso, setLoginExitoso] = useState(false);

    const handleLogin = async (email , password) => {
        setLoading(true);
        try {
            const datos = await login(email, password);
            setLoginExitoso(true);
            return { success: true , datos }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                let mensajes = error.response.data.errors.map((error) => error.msg);
                setMensajesBack(mensajes);
              } else if (error.response) {
                setMensajesBack([error.response.data.res]);
              } else {
                setMensajesBack(["Error desconocido"]);
              }
              setLoginExitoso(false);
              setModalVisible(true);
              console.log("Error al iniciar sesion ", error);
              return { success: false , error }
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        modalVisible,
        setModalVisible,
        mensajesBack,
        loginExitoso,
        handleLogin
    }

}