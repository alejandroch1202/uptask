import { Spinner } from '@/components/common/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { removeNote } from '@/services/notes'
import type { Note } from '@/types/index'
import { formatDate } from '@/utils/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const NoteDetails = ({ note }: { note: Note }) => {
  const { data, isLoading } = useAuth()
  const isAdmin = useMemo(() => data?._id === note.createdBy._id, [data])
  const params = useParams()
  const projectId = params.projectId!

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const taskId = queryParams.get('viewTask')!

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeNote,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  if (isLoading) return <Spinner />

  if (data !== undefined) {
    return (
      <div className='p-3 flex justify-between items-center'>
        <div>
          <p>
            {note.content} por {''}
            <span className='font-bold'>{note.createdBy.name}</span>
          </p>
          <p className='text-xs text-gray-500'>{formatDate(note.createdAt)}</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              mutate({ projectId, taskId, noteId: note._id })
            }}
            type='button'
            className='bg-red-500 hover:bg-red-600 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-md'
          >
            Eliminar
          </button>
        )}
      </div>
    )
  }
}
