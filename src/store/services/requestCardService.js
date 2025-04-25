import API from './api'

export const getRequestByID = async category_id => {
	const response = await API.get(`/v1/categories/${category_id}/services`)
	return response || {}
}
