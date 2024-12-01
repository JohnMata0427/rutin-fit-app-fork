import { useState } from "react";
import { obtenerDiasCompletados } from "../services/AuthService";

export function DiasCompletadosViewModel() {
    const [loading , setLoading] = useState(false)

    const handleDiasCompletados = async (token) => {
        setLoading(true)
        try{
            const datos = await obtenerDiasCompletados(token)
            console.log(datos)
            return { success: true, datos }
        } catch (error) {
            console.log(error)
            return { success: false , error }
        } finally {
            setLoading(false)
        }
    }

    return{
        handleDiasCompletados,
        loading
    }

}