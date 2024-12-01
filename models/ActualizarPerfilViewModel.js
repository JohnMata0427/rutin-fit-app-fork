import React from "react";
import { useState } from "react";
import { actualizarPerfil } from "../services/AuthService";

export function ActualizarPerfilViewModel() {
  const handleUpdateProfile = async (
    token,
    name,
    lastname,
    genre,
    weight,
    height,
    age,
    levelactivity,
    days
  ) => {
    try {
      const datos = await actualizarPerfil(
        token,
        name,
        lastname,
        genre,
        weight,
        height,
        age,
        levelactivity,
        days
      );
      return { success: true, datos };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  };
  return { handleUpdateProfile };
}
