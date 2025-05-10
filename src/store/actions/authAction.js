import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../services/authService";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      debugger
      const response = await registerUser(data);
      console.log("Register response:", response);
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Ошибка регистрации пользователя";
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      console.log("Login response:", response);
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Ошибка входа пользователя";
      return rejectWithValue(errorMessage);
    }
  }
);