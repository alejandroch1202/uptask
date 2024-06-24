import { isAxiosError } from 'axios'
import { api } from '@/config/axios'
import {
  type TeamMemberForm,
  teamMemberSchema,
  teamMembersSchema
} from '../types'

export const addUserToProject = async ({
  projectId,
  id
}: {
  projectId: string
  id: string
}) => {
  try {
    const { data } = await api.post(`/projects/${projectId}/team`, { id })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const listMembers = async ({ projectId }: { projectId: string }) => {
  try {
    const { data } = await api.get(`/projects/${projectId}/team`)
    const response = teamMembersSchema.safeParse(data.team)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const findMemberByEmail = async ({
  projectId,
  formData
}: {
  projectId: string
  formData: TeamMemberForm
}) => {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/team/find`,
      formData
    )
    const response = teamMemberSchema.safeParse(data.user)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const removeUserFromProject = async ({
  projectId,
  id
}: {
  projectId: string
  id: string
}) => {
  try {
    const { data } = await api.delete(`/projects/${projectId}/team/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
