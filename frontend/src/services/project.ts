import {
  dashboardProjectSchema,
  type Project,
  type DraftProject,
  projectSchema
} from '@/types/index'
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

export const listProjects = async () => {
  try {
    const { data } = await api.get('/projects')
    const response = dashboardProjectSchema.safeParse(data.projects)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const findProject = async (id: Project['_id']) => {
  try {
    const { data } = await api.get(`/projects/${id}`)
    const response = projectSchema.safeParse(data.project)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

interface editProjectProps {
  formData: DraftProject
  projectId: Project['_id']
}

export const editProject = async ({
  formData,
  projectId
}: editProjectProps) => {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData)

    if (data.ok === true) {
      return data
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const removeProject = async (id: Project['_id']) => {
  try {
    const { data } = await api.delete(`/projects/${id}`)

    if (data.ok === true) {
      return data
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
