import { isAxiosError } from 'axios'
import { api } from '@/config/axios'
import {
  type Project,
  type DraftTask,
  type Task,
  taskSchema
} from '@/types/index'

interface TaskApiProps {
  formData: DraftTask
  projectId: Project['_id']
  taskId: Task['_id']
  status: Task['status']
}

export const createTask = async ({
  formData,
  projectId
}: Pick<TaskApiProps, 'formData' | 'projectId'>) => {
  try {
    const { data } = await api.post(`/projects/${projectId}/tasks`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const findTask = async ({
  projectId,
  taskId
}: Pick<TaskApiProps, 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`)
    const response = taskSchema.safeParse(data.task)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const editTask = async ({
  formData,
  projectId,
  taskId
}: Pick<TaskApiProps, 'formData' | 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.put(
      `/projects/${projectId}/tasks/${taskId}`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const removeTask = async ({
  projectId,
  taskId
}: Pick<TaskApiProps, 'projectId' | 'taskId'>) => {
  try {
    const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const updateTaskStatus = async ({
  projectId,
  taskId,
  status
}: Pick<TaskApiProps, 'projectId' | 'taskId' | 'status'>) => {
  try {
    console.log(projectId, taskId, status)
    const { data } = await api.post(
      `/projects/${projectId}/tasks/${taskId}/status`,
      { status }
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
