import { createAsyncThunk } from '@reduxjs/toolkit'
import { getServiceList } from '../services/servicesListService'

export const serviceList = createAsyncThunk(
	'service/list',
	async (_, { rejectWithValue }) => {
		try {
			const data = await getServiceList()
			console.log('Service list response:', data)
			return data
		} catch (error) {
			const errorMessage =
				error.response?.data?.detail || 'Ошибка получения списка услуг'
			return rejectWithValue(errorMessage)
		}
	}
)
