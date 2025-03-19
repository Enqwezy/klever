import { createAsyncThunk } from '@reduxjs/toolkit'
import { getServiceProfile } from '../services/serviceProfileService'

export const serviceProfile = createAsyncThunk(
	'service/profile',
	async (_, { rejectWithValue }) => {
		try {
			const data = await getServiceProfile()
			console.log('Verification response:', data)
			return data
		} catch (error) {
			const errorMessage =
				error.response?.data?.detail || 'Ошибка получения данных'
			return rejectWithValue(errorMessage)
		}
	}
)
