import { createAsyncThunk } from '@reduxjs/toolkit'
import { getServiceProfile } from '../services/serviceProfileService'

export const serviceProfile = createAsyncThunk(
	'service/profile',
	async (service_id, { rejectWithValue }) => {
		try {
			const data = await getServiceProfile(service_id)
			return data
		} catch (error) {
			const errorMessage =
				error.response?.data?.detail || 'Ошибка получения данных'
			return rejectWithValue(errorMessage)
		}
	}
)
