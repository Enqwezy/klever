import { configureStore } from '@reduxjs/toolkit'
// import albumReducer from './reducers/serviceCardReducer'
import authSlice from './reducers/authReducer'
import userReducer from './reducers/profileReducer'
import serviceListSlice from './reducers/servicesListReducer'
import serviceByIdSlice from './reducers/requestCardReducer'

const store = configureStore({
	reducer: {
		// albums: albumReducer,
		auth: authSlice,
		user: userReducer,
		serviceList: serviceListSlice,
		serviceById: serviceByIdSlice,
	},
})

export default store
