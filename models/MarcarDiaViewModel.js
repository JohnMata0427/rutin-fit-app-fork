import { useState } from "react";
import { marcarDia } from "../services/AuthService";

export function MarcarDiaViewModel(){
    const [ loading , setLoading ] = useState(false);
    const [ mensajesBack , setMensajesBack ] = useState([]);

    const handleMarcarDia = async (token , day) => {
        setLoading(true);
        try {
            const datos = await marcarDia(token, day);
            return { success: true , datos };
        } catch (error) {
            if(error.response) {
                setMensajesBack([error.response.data.res]);
            } else {
                setMensajesBack(["Error desconocido"])
            }
            return { success: false , mensajesBack }
        } finally {
            setLoading(false);
        }
    }

    return {
        handleMarcarDia,
        loading,
        mensajesBack
    }
}