import { isAxiosError } from 'axios'
import { api } from '@/config/axios'
import type {
  ForgotPasswordForm,
  LoginForm,
  RequestConfirmTokenForm,
  SignupForm,
  UpdatePasswordForm
} from '../types'

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

export const requestConfirmToken = async (
  formData: RequestConfirmTokenForm
) => {
  try {
    const { data } = await api.post('/auth/request-token', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const login = async (formData: LoginForm) => {
  const { email, password } = formData

  try {
    const encode = btoa(`${email}:${password}`)
    api.defaults.headers.common.authorization = `Basic ${encode}`
    const { data } = await api.post('/auth/login')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  try {
    const { data } = await api.post('/auth/forgot-password', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const validateToken = async (token: string) => {
  try {
    const { data } = await api.post('/auth/validate-token', { token })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const updatePassword = async (formData: UpdatePasswordForm) => {
  try {
    const { data } = await api.post(
      `/auth/update-password/${formData.token}`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
