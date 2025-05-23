import { createSlice } from '@reduxjs/toolkit'
import { fetchRequestByID, fetchSearchCard } from '../actions/requestCardAction'

const serviceByIdSlice = createSlice({
	name: 'serviceById',
	initialState: {
		searchData: [],
		serviceData: [],
		loading: false,
		error: null,
	},
	reducers: {
		resetServiceByIdState: state => {
			state.serviceData = []
			state.loading = false
			state.error = null
		},
		resetServiceByIdState: state => {
			state.searchData = []
			state.loading = false
			state.error = null
		},
	},

	extraReducers: builder => {
		builder
			.addCase(fetchRequestByID.pending, state => {
				state.loading = true
				state.error = null
				state.serviceData = []
			})
			.addCase(fetchRequestByID.fulfilled, (state, action) => {
				state.loading = false
				state.serviceData = action.payload
				state.error = null
			})
			.addCase(fetchRequestByID.rejected, (state, action) => {
				state.loading = false
				state.serviceData = []
				state.error = action.payload
			})
			.addCase(fetchSearchCard.pending, state => {
				state.loading = true
				state.error = null
				state.searchData = []
			})
			.addCase(fetchSearchCard.fulfilled, (state, action) => {
				state.loading = false
				state.searchData = action.payload
				state.error = null
			})
			.addCase(fetchSearchCard.rejected, (state, action) => {
				state.loading = false
				state.searchData = []
				state.error = action.payload
			})
	},
})

export const { resetServiceByIdState } = serviceByIdSlice.actions
export default serviceByIdSlice.reducer