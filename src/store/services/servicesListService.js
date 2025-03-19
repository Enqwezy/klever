import API from './api'

export const getServiceList = async () => {
	const response = await API.get('/api/services/')
	return response.data
}
