import { createAsyncThunk } from '@reduxjs/toolkit'
import { getServiceListById } from '../services/servicesListService'

export const serviceList = createAsyncThunk(
	'service/list',
	async (category_id, { rejectWithValue }) => {
		try {
			const data = await getServiceListById(category_id)
			console.log('Service list response:', data)
			return data
		} catch (error) {
			const errorMessage =
				error.response?.data?.detail || 'Ошибка получения списка услуг'
			return rejectWithValue(errorMessage)
		}
	}
)
