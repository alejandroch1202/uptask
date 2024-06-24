import { isAxiosError } from 'axios'
import { api } from '@/config/axios'
import { type TeamMemberForm, teamMemberSchema } from '../types'

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
