import type { DraftProject } from '@/types/index'
import { api } from '@/config/axios'
import { isAxiosError } from 'axios'

export const createProject = async (formData: DraftProject) => {
  try {
    const { data } = await api.post('/projects', formData)
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
