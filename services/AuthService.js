import axios from "axios";

export async function login(email, password) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/login`,
    { email, password }
  );
  return respuesta.data;
}

export async function register(name, lastname, email, password) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/client/only-register`,
    { name, lastname, email, password }
  );
  return respuesta.data;
}

export async function confirmarEmail(email, code) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/client/confirm-email`,
    {
      email,
      code,
    }
  );
  return respuesta.data;
}

export async function datosCliente(token, genre, weight, height, age, levelactivity, days, coach_id) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/client/configure-profile`,
    {
      genre,
      weight,
      height,
      age,
      levelactivity,
      days,
      coach_id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function entrenadores(token) {
  const respuesta = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/coach/view-coaches`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return respuesta.data;
}

export async function perfil(token) {
  const respuesta = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/client/view-profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return respuesta.data;
}

export async function olvidarContraseña(codigo){
  const respuesta = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/client/forget-password`, {
    code: codigo
  })
  return respuesta.data;
}

export async function rutina(token){
  const respuesta = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/client/view-routine`, {headers: {
    Authorization: `Bearer ${token}`
  }})
  console.log(respuesta.data);
  
  return respuesta.data;
}

export async function chat(token){
  const respuesta = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_LOCAL_URI}/chat`, {headers: {
    Authorization: `Bearer ${token}`
  }})
  return respuesta.data;
}
