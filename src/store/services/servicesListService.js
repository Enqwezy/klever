import API from './api'

export const getServiceListById = async category_id => {
	try {
		const response = await API.get(`/v1/categories/${category_id}/variants`)
		return response.data || []
	} catch (error) {
		throw error 
	}
}
