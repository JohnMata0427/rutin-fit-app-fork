import { useState } from "react";
import { rutina } from "../services/AuthService";

export function RutinaViewModel(){

    const [ loadingRutina , setLoadingRutina ] = useState(false);

    const handleRutina = async (token) => {
        setLoadingRutina(true);
        try {
            const datos = await rutina(token);
            return { success: true , datos };
        } catch (error) {
            console.log(error.response.data.res);
            return { success: false , error };
        } finally {
            setLoadingRutina(false);
        }
    }
    
    return{
        loadingRutina,
        handleRutina
    }

}