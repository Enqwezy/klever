import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
// import albumReducer from './reducers/serviceCardReducer'
import authSlice from './reducers/authReducer'
import userReducer from './reducers/profileReducer'
import serviceListSlice from './reducers/servicesListReducer'
import serviceByIdSlice from './reducers/requestCardReducer'
import serviceProfileSlice from './reducers/serviceProfileReducer'

const store = configureStore({
	reducer: {
		// albums: albumReducer,
		auth: authSlice,
		user: userReducer,
		serviceList: serviceListSlice,
		serviceById: serviceByIdSlice,
		serviceProfile: serviceProfileSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),	
})

export default store
