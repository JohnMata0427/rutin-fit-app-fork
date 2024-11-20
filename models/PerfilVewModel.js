import { useState } from "react";
import { perfil } from "../services/AuthService";

export function PerfilViewModel() {
    const [ loadingPerfil , setLoadingPerfil ] = useState(false);

    const handlePerfil = async (token) => {
        setLoadingPerfil(true);
        try{
            const datos = await perfil(token);
            return { success: true , datos }
        } catch (error) {
            console.log(error);
            return { success: false , error }
        } finally {
            setLoadingPerfil(false);
        }
    }

    return{
        handlePerfil,
        loadingPerfil,
    }

}