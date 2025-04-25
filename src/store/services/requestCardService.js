import API from './api'

export const getRequestByID = async category_id => {
	const response = await API.get(`/api/services/${category_id}/`)
	return response.data
}
