import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRequestByID } from '../services/requestCardService'

export const fetchRequestByID = createAsyncThunk(
	'request/byId',
	async (category_id, { rejectWithValue }) => {
		try {
			const response = await getRequestByID(category_id)
			debugger
			return response.data || {}

		} catch (error) {
			const errorMessage = error.message || 'Ошибка получения данных услуги'
			return rejectWithValue(errorMessage)
		}
	}
)




export const setRegions = createAsyncThunk(
	'filter/setRegions',
	async (regions, { rejectWithValue }) => {
		try {
			return regions
		} catch (error) {
			const errorMessage = error.message || 'Ошибка установки регионов'
			return rejectWithValue(errorMessage)
		}
	}
)

export const setSubcategories = createAsyncThunk(
	'filter/setSubcategories',
	async (subcategories, { rejectWithValue }) => {
		try {
			return subcategories
		} catch (error) {
			const errorMessage = error.message || 'Ошибка установки подкатегорий'
			return rejectWithValue(errorMessage)
		}
	}
)

export const setPriceRange = createAsyncThunk(
	'filter/setPriceRange',
	async ({ min, max }, { rejectWithValue }) => {
		try {
			const priceRange = { min, max }
			return priceRange
		} catch (error) {
			const errorMessage = error.message || 'Ошибка установки диапазона цен'
			return rejectWithValue(errorMessage)
		}
	}
)

export const setRatingRange = createAsyncThunk(
	'filter/setRatingRange',
	async ({ min, max }, { rejectWithValue }) => {
		try {
			const ratingRange = { min, max }
			return ratingRange
		} catch (error) {
			const errorMessage =
				error.message || 'Ошибка установки диапазона рейтинга'
			return rejectWithValue(errorMessage)
		}
	}
)

export const fetchSubcategories = createAsyncThunk(
	'filter/fetchSubcategories',
	async (_, { rejectWithValue }) => {
		try {
			const mockSubcategories = ['Маникюр', 'Педикюр', 'Массаж', 'Стрижка']
			return mockSubcategories
		} catch (error) {
			const errorMessage = error.message || 'Ошибка получения подкатегорий'
			return rejectWithValue(errorMessage)
		}
	}
)

export const fetchRequests = createAsyncThunk(
	'filter/fetchRequests',
	async (filters, { rejectWithValue }) => {
		try {
			const mockRequests = [
				{ id: 1, title: 'Маникюр', price: 5000, rating: 4.5 },
				{ id: 2, title: 'Педикюр', price: 7000, rating: 4.8 },
				{ id: 3, title: 'Массаж', price: 6000, rating: 4.2 },
			]
			return mockRequests
		} catch (error) {
			const errorMessage = error.message || 'Ошибка получения запросов'
			return rejectWithValue(errorMessage)
		}
	}
)

export const setSortOption = createAsyncThunk(
	'filter/setSortOption',
	async (sortOption, { rejectWithValue }) => {
		try {
			return sortOption
		} catch (error) {
			const errorMessage = error.message || 'Ошибка установки сортировки'
			return rejectWithValue(errorMessage)
		}
	}
)
