import { createSlice } from '@reduxjs/toolkit'
import {
	fetchUserProfile,
	fetchUserFavorites,
	addFavorite,
	deleteFavorite,
	updateProfile,
} from '../actions/profileAction'

import { logout } from './authReducer'

const initialState = {
	user: null,
	favorites: [],
	loading: false,
	error: null,
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		clearProfile: state => {
			state.user = null
			state.favorites = []
			state.loading = false
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUserProfile.pending, state => {
				state.loading = true
				state.error = null
				state.user = null
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
				state.error = null
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false
				state.user = null
				state.error = action.payload
			}) //favorite
			.addCase(fetchUserFavorites.pending, state => {
				state.loading = true
				state.error = null
				state.favorites = []
			})
			.addCase(fetchUserFavorites.fulfilled, (state, action) => {
				state.loading = false
				state.favorites = action.payload
				state.error = null
			})
			.addCase(fetchUserFavorites.rejected, (state, action) => {
				state.loading = false
				state.favorites = []
				state.error = action.payload
			}) // addfavorite
			.addCase(addFavorite.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(addFavorite.fulfilled, (state, action) => {
				const newFavorite = action.payload
				if (!state.favorites.some(item => item.id === newFavorite.id)) {
					state.favorites.push(newFavorite)
				}
				state.loading = false
				state.error = null
			})
			.addCase(addFavorite.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			}) // deletefavorite
			.addCase(deleteFavorite.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteFavorite.fulfilled, (state, action) => {
				const idToDelete = action.payload // Assuming the response contains the ID of the deleted favorite
				state.favorites = state.favorites.filter(item => item.id !== idToDelete)
				state.loading = false
				state.error = null
			})
			.addCase(deleteFavorite.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(updateProfile.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload // Assuming the response contains the updated user profile
				state.error = null
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(logout, state => {
				state.user = null
				state.favorites = []
				state.loading = false
				state.error = null
			})
	},
})
export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
