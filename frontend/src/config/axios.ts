import axios from 'axios'

export const apiLogin = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
