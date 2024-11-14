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
  console.log(respuesta.data);
  
  return respuesta.data;
  
  
}
