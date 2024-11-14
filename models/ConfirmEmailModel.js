import { useState } from "react";
import { confirmarEmail } from "../services/AuthService";


export function ConfirmEmailViewModel() {
    const [ loading , setLoading ] = useState(false);

    const [ modalCodeVisible , setModalCodeVisible ] = useState(false);

    const [ mensajesBack , setMensajesBack ] = useState([]);

    const [ codigoCorrecto , setCodigoCorrecto ] = useState(false);

    const handleCodigo = async ( email , code ) => {
        setLoading(true);
        try {
            const datos = await confirmarEmail(email , code);
            console.log(datos);
            
            setCodigoCorrecto(true);
            return { titulo: "Éxito" , mensaje: "Código de verificación correcto" };
        } catch (error) {
            if ( error.response ) {
                setMensajesBack([error.response.data.res]);
            } else {
                setMensajesBack(["Error Desconocido"]);
            }
            setCodigoCorrecto(false);
            setModalCodeVisible(true);
            console.log("Error" , error);
            return { titulo: "Error" , mensaje: "Error al verificar el código" };
        } 
        // finally {
        //     setLoading(false);
        // }
    }

    return {
        loading,
        modalCodeVisible,
        mensajesBack,
        codigoCorrecto,
        handleCodigo
    }

}