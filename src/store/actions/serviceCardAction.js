import { createAsyncThunk } from '@reduxjs/toolkit'
import { getServiceByID } from '../services/serviceCardService'

export const fetchServiceByID = createAsyncThunk(
	'service/byId',
	async (id, { rejectWithValue }) => {
		try {
			const data = await getServiceByID(id)
			console.log('Service by ID response:', data)
			return data
		} catch (error) {
			const errorMessage =
				error.response?.data?.detail || 'Ошибка получения данных услуги'
			return rejectWithValue(errorMessage)
		}
	}
)
