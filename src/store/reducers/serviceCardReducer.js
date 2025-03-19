import { createSlice } from '@reduxjs/toolkit'
import { fetchServiceByID } from '../actions/serviceCardAction'

const initialState = {
	serviceData: null,
	loading: false,
	error: null,
}

const serviceByIdSlice = createSlice({
	name: 'serviceById',
	initialState,
	reducers: {
		resetServiceByIdState: state => {
			state.serviceData = null
			state.loading = false
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchServiceByID.pending, state => {
				state.loading = true
				state.error = null
				state.serviceData = null
			})
			.addCase(fetchServiceByID.fulfilled, (state, action) => {
				state.loading = false
				state.serviceData = action.payload
				state.error = null
			})
			.addCase(fetchServiceByID.rejected, (state, action) => {
				state.loading = false
				state.serviceData = null
				state.error = action.payload
			})
	},
})

export const { resetServiceByIdState } = serviceByIdSlice.actions
export default serviceByIdSlice.reducer
