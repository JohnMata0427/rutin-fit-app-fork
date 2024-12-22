import { useState } from "react";
import { entrenadores } from "../services/AuthService";

export function EntrenadoresViewModel () {

    const [ loading , setLoading ] = useState(false);
    const [ modalVisible , setModalVisible ] = useState(false);

    const handleEntrenadores = async ( token ) => {
        setLoading(true);
        try {
            const datos = await entrenadores(token)
            
            setModalVisible(true);
            return { success: true , datos }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return{
        loading,
        modalVisible,
        handleEntrenadores,
    }

}