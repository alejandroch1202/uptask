import { isAxiosError } from 'axios'
import { api, apiLogin } from '@/config/axios'
import {
  userSchema,
  type ForgotPasswordForm,
  type LoginForm,
  type RequestConfirmTokenForm,
  type SignupForm,
  type UpdatePasswordForm
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
    const { data } = await apiLogin.post(
      '/auth/login',
      {},
      {
        headers: {
          Authorization: `Basic ${encode}`
        }
      }
    )
    localStorage.setItem('token', data.token)
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

export const getUserInfo = async () => {
  try {
    const { data } = await api.get('/auth/user')
    const response = userSchema.safeParse(data.user)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      localStorage.removeItem('token')
      throw new Error(error.response.data.message)
    }
  }
}
