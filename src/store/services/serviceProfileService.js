import API from './api'

export const getServiceProfile = async (service_id) => {
	const response = await API.get(`/v1/services/${service_id}`)
	return response.data
}
    