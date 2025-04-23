import API from './api'

export const getUserProfile = async (token) => {
    const response = await API.get(`/v1/user/profile`, {
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
    const response = await API.put(`/v1/user/profile`, data, {
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
    const response = await API.get(`/v1/user/favorites`, {
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
    const response = await API.post(`/v1/user/favorites`, data, {
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
    const response = await API.delete(`/v1/user/favorites/${id}`, {
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

