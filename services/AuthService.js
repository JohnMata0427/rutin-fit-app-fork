import axios from "axios";

export async function login(email, password) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/login`,
    { email, password }
  );
  return respuesta.data;
}

export async function register(name, lastname, email, password) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/only-register`,
    { name, lastname, email, password }
  );
  return respuesta.data;
}

export async function confirmarEmail(email, code) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/confirm-email`,
    {
      email,
      code,
    }
  );
  return respuesta.data;
}

export async function datosCliente(
  token,
  genre,
  weight,
  height,
  age,
  levelactivity,
  days,
  coach_id
) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/configure-profile`,
    {
      genre,
      weight,
      height,
      age,
      levelactivity,
      days,
      coach_id,
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
  const respuesta = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND}/coach/view-coaches`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function perfil(token) {
  const respuesta = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/view-profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function olvidarContraseña(codigo) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/forget-password`,
    {
      code: codigo,
    }
  );
  return respuesta.data;
}

export async function rutina(token) {
  const respuesta = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/view-routine`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return respuesta.data;
}

export async function chat(token, client_id, coach_id) {
  const respuesta = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND}/chats/${client_id}/${coach_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function marcarDia(token, day) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/mark-day-completed`,
    { day },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function obtenerDiasCompletados(token) {
  const respuesta = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/view-completed-days`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return respuesta.data;
}

export async function actualizarPerfil(
  token,
  name,
  lastname,
  email,
  genre,
  weight,
  height,
  age,
  levelactivity,
  days
) {
  const respuesta = await axios.put(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/update-profile`,
    { name, lastname, email, genre, weight, height, age, levelactivity, days },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function restaurarContraseña(email) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/restore-password`,
    { email }
  );
  return respuesta.data;
}

export async function cambiarContraseña(email, password, confirmPassword) {
  const respuesta = await axios.put(
    `${process.env.EXPO_PUBLIC_BACKEND}/client/new-password`,
    { email, password, confirmPassword }
  );
  return respuesta.data;
}

export async function tokenNotification(token, tokenN) {
  
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/save-notification-token`,
    { token: tokenN },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return respuesta.data;
}

export async function progreso(token, id, observations, currentWeight) {
  const respuesta = await axios.put(
    `${process.env.EXPO_PUBLIC_BACKEND}/progress/${id}`,
    { observations , currentWeight },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

export async function crearProgreso(token, observations, currentWeight) {
  const respuesta = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND}/progress`,
    { observations , currentWeight },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respuesta.data;
}

