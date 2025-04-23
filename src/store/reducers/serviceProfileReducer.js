import { createSlice } from '@reduxjs/toolkit'
import { serviceProfile } from '../actions/serviceProfileActions'

const initialState = {
	serviceProfileData: [
		{
			id: 1,
			nameService: 'wrfrf',
		},
	],
	loading: false,
	error: null,
}

const serviceProfileSlice = createSlice({
	name: 'serviceProfile',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(serviceProfile.pending, state => {
				state.loading = true
				state.error = null
				state.serviceProfileData = null
			})
			.addCase(serviceProfile.fulfilled, (state, action) => {
				state.loading = false
				state.serviceProfileData = action.payload
				state.error = null
			})
			.addCase(serviceProfile.rejected, (state, action) => {
				state.loading = false
				state.serviceProfileData = null
				state.error = action.payload
			})
	},
})

export const { resetVerifyState } = serviceProfileSlice.actions
export default serviceProfileSlice.reducer
