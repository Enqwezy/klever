import { createAsyncThunk } from '@reduxjs/toolkit'
import { postChat } from '../services/chatService'

export const chat = createAsyncThunk(
    'chat/post',
    async (message, { rejectWithValue }) => {
        try {
            const data = await postChat(message)
            return data
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || 'Ошибка получения данных'
            return rejectWithValue(errorMessage)
        }
    }
)