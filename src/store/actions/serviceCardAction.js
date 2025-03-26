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


export const setRegions = createAsyncThunk(
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


export const setSubcategories = createAsyncThunk(
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


export const setPriceRange = createAsyncThunk(
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


export const setRatingRange = createAsyncThunk(
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


export const fetchSubcategories = createAsyncThunk(
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


export const fetchRequests = createAsyncThunk(
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


export const setSortOption = createAsyncThunk(
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

