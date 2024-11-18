import { useState } from "react";
import { datosCliente } from "../services/AuthService";

export function useDatosViewModel() {
    const [ loading , setLoading ] = useState(false);
    const [ modalVisible , setModalVisible ] = useState(false);
    const [ envioDatos , setEnvioDatos ] = useState(false);

    const [datos, setDatos] = useState({
        genre: "",
        age: "",
        height: "",
        weight: "",
        levelactivity: "",
        days: [],
        token: "",
        coach_id: "",
      });

    const handleDatos = async ( token, genre, weight, height, age, levelactivity, days, coach_id ) => {
        setLoading(true);
        try {
            const datos = await datosCliente( token, genre, weight, height, age, levelactivity, days, coach_id);
            setEnvioDatos(true);
            return { success: true, datos }
        } catch (error) {
            console.log(error);
            return { success: false , error }
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        modalVisible,
        setModalVisible,
        envioDatos,
        handleDatos,
        datos,
        setDatos
    }

}