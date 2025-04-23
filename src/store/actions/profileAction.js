import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserFavorites, getUserProfile, addUserFavorite, deleteUserFavorite, updateUserProfile } from '../services/profileService'

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserProfile(token)
      console.log('User profile response:', response)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error fetching user profile'
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchUserFavorites = createAsyncThunk(
  'profile/fetchUserFavorites',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserFavorites(token)
      console.log('User favorites response:', response)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error fetching user favorites'
      return rejectWithValue(errorMessage)
    }
  }
)

export const addFavorite = createAsyncThunk(
  'profile/addFavorite',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await addUserFavorite(token, data)
      console.log('Add favorite response:', response)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error adding favorite'
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'profile/deleteFavorite',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await deleteUserFavorite(token, id)
      console.log('Delete favorite response:', response)
      return id
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error deleting favorite'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await updateUserProfile(token, data)
      console.log('Update profile response:', response)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error updating profile'
      return rejectWithValue(errorMessage)
    }
  }
)