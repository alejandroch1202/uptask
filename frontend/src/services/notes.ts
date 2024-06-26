import { isAxiosError } from 'axios'
import { api } from '@/config/axios'
import type { Note, NoteFormData } from '../types'

interface CreateNoteProps {
  projectId: string
  taskId: string
  formData: NoteFormData
  noteId: Note['_id']
}

export const createNote = async ({
  projectId,
  taskId,
  formData
}: Pick<CreateNoteProps, 'projectId' | 'taskId' | 'formData'>) => {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/tasks/${taskId}/notes`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}

export const removeNote = async ({
  projectId,
  taskId,
  noteId
}: Pick<CreateNoteProps, 'projectId' | 'taskId' | 'noteId'>) => {
  try {
    const { data } = await api.delete(
      `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response !== undefined) {
      throw new Error(error.response.data.message)
    }
  }
}
