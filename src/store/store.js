import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './reducers/serviceCardReducer'
import authSlice from './reducers/authReducer'

const store = configureStore({
	reducer: {
		albums: albumReducer,
		auth: authSlice,
	},
})

export default store
