import { isAxiosError } from 'axios'
import { api } from '@/config/axios'
import type { SignupForm } from '../types'

export const signup = async (formData: SignupForm) => {
  try {
    const { data } = await api.post('/auth/signup', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const confirmAccount = async (token: string) => {
  try {
    const { data } = await api.post('/auth/confirm-account', { token })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
