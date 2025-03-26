import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './reducers/serviceCardReducer'

const store = configureStore({
	reducer: {
		albums: albumReducer,
	},
})

export default store
