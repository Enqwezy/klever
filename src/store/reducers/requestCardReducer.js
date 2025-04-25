import { createSlice } from '@reduxjs/toolkit'
import { fetchRequestByID } from '../actions/requestCardAction'

const initialState = {
	serviceData: [],
	loading: false,
	error: null,
}

const serviceByIdSlice = createSlice({
	name: 'serviceById',
	initialState,
	reducers: {
		resetServiceByIdState: state => {
			state.serviceData = []
			state.loading = false
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchRequestByID.pending, state => {
				state.loading = true
				state.error = null
				state.serviceData = null
			})
			.addCase(fetchRequestByID.fulfilled, (state, action) => {
				state.loading = false
				state.serviceData = action.payload
				state.error = null
			})
			.addCase(fetchRequestByID.rejected, (state, action) => {
				state.loading = false
				state.serviceData = null
				state.error = action.payload
			})
	},
})

export const { resetServiceByIdState } = serviceByIdSlice.actions
export default serviceByIdSlice.reducer
