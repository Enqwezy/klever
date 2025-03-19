import API from './api'

export const getServiceProfile = async () => {
	const response = await API.get('/auth/api/documents/')
	return response.data
}
    