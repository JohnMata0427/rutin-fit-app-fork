import axios from 'axios';

export const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND;

export const requestLogin = async form => {
  const response = await axios.post(`${BACKEND_URL}/login`, form);
  return response.data;
};

export const requestRegister = async form => {
  const response = await axios.post(
    `${BACKEND_URL}/client/only-register`,
    form,
  );
  return response.data;
};

export const requestConfirmEmail = async form => {
  const response = await axios.post(
    `${BACKEND_URL}/client/confirm-email`,
    form,
  );
  return response.data;
};

export const requestConfigureProfile = async form => {
  const response = await axios.post(
    `${BACKEND_URL}/client/configure-profile`,
    form,
  );
  return response.data;
};

export const requestViewCoachs = async token => {
  const response = await axios.get(`${BACKEND_URL}/coach/view-coachs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const requestViewProfile = async token => {
  const response = await axios.get(`${BACKEND_URL}/client/view-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const requestPasswordRecovery = async form => {
  const response = await axios.post(
    `${BACKEND_URL}/client/forget-password`,
    form,
  );
  return response.data;
};

export const requestViewRoutine = async token => {
  const response = await axios.get(`${BACKEND_URL}/client/view-routine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const requestChat = async (
  token,
  client_id,
  coach_id,
  page = 1,
  limit = 50,
) => {
  const response = await axios.get(
    `${BACKEND_URL}/chats/${client_id}/${coach_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    },
  );
  return response.data;
};

export const requestCheckDay = async (token, day) => {
  const response = await axios.post(
    `${BACKEND_URL}/client/mark-day-completed`,
    { day },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const requestViewCompletedDays = async token => {
  const response = await axios.get(
    `${BACKEND_URL}/client/view-completed-days`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const requestUpdateProfile = async (token, form) => {
  const response = await axios.put(
    `${BACKEND_URL}/client/update-profile`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const requestRestorePassword = async email => {
  const response = await axios.post(`${BACKEND_URL}/client/restore-password`, {
    email,
  });
  return response.data;
};

export const requestChangePassword = async form => {
  const response = await axios.put(`${BACKEND_URL}/client/new-password`, form);
  return response.data;
};

export const requestSaveNotificationToken = async (
  token,
  notification_token,
) => {
  const response = await axios.post(
    `${BACKEND_URL}/client/save-notification-token`,
    { token: notification_token },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const requestUpdateProgress = async (token, id, form) => {
  const response = await axios.put(`${BACKEND_URL}/progress/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const requestCreateProgress = async (token, form) => {
  const response = await axios.post(`${BACKEND_URL}/progress`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
