import { createSlice } from '@reduxjs/toolkit'
import { serviceList } from '../actions/servicesListAction'

const initialState = {
	serviceListData: [],
	loading: false,
	error: null,
}

const serviceListSlice = createSlice({
	name: 'serviceList',
	initialState,
	reducers: {
		resetServiceListState: state => {
			state.serviceListData = []
			state.loading = false
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(serviceList.pending, state => {
				state.loading = true
				state.error = null
				state.serviceListData = []
			})
			.addCase(serviceList.fulfilled, (state, action) => {
				state.loading = false
				state.serviceListData = action.payload
				state.error = null
			})
			.addCase(serviceList.rejected, (state, action) => {
				state.loading = false
				state.serviceListData = []
				state.error = action.payload
			})
	},
})

export const { resetServiceListState } = serviceListSlice.actions
export default serviceListSlice.reducer
