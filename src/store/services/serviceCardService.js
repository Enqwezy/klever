import API from './api'

export const getServiceByID = async id => {
	const response = await API.get(`/api/services/${id}/`)
	return response.data
}
