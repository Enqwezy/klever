import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
// import albumReducer from './reducers/serviceCardReducer'
import authSlice from './reducers/authReducer'
import userReducer from './reducers/profileReducer'
import serviceListSlice from './reducers/servicesListReducer'
import serviceByIdSlice from './reducers/requestCardReducer'
import serviceProfileSlice from './reducers/serviceProfileReducer'
import chatSlice from './reducers/chatReducer'

const store = configureStore({
	reducer: {
		auth: authSlice,
		user: userReducer,
		serviceList: serviceListSlice,
		serviceById: serviceByIdSlice,
		serviceProfile: serviceProfileSlice,
		chat: chatSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),	
})

export default store
