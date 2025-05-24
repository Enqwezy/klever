import API from './api'

export const getUserProfile = async (token) => {
    const response = await API.get(`/v1/user/get-user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.data
    } else {
        console.log('Error fetching user profile:', response.status, response.data)
    }
}

export const updateUserProfile = async (token, data) => {
    const response = await API.put(`/v1/user/user/update`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.data
    } else {
        console.log('Error updating user profile:', response.status, response.data)
    }
}

export const getUserFavorites = async (token) => {
    const response = await API.get(`/v1/favourites`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.data
    } else {
        console.log('Error fetching user favorites:', response.status, response.data)
    }
}

export const addUserFavorite = async (token, data) => {
    const response = await API.post(`/v1/add-favourites`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.data
    } else {
        console.log('Error adding user favorite:', response.status, response.data)
    }
}

export const deleteUserFavorite = async (token, id) => {
    const response = await API.delete(`/v1/favourites/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.data
    } else {
        console.log('Error deleting user favorite:', response.status, response.data)
    }
}

