import API from './api'


export const getRequestByID = async category_id => {
	try {
		const response = await API.get(`/v1/categories/${category_id}/services`)
		return response.data || []
	} catch (error) {
		throw error 
	}
}

export const searchCard = async query => {
	try {
		const response = await API.get(`/v1/tutors?limit=5&query=${query}`)
		return response.data || []
	} catch (error) {
		throw error
	}
}


// export const searchCard = async data => {
// 	try {
// 		const response = await API.get(`/v1/categories/${data}/services`)
// 		return response.data || []
// 	} catch (error) {
// 		throw error
// 	}
// }