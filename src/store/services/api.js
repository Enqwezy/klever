import axios from 'axios'

const API = axios.create({
	baseURL: import.meta.env.VITE_APP_BASEURL,
})

export default API
