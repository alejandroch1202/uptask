import { useForm } from 'react-hook-form'
import type { NoteFormData } from '@/types/index'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/services/notes'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export const AddNoteForm = () => {
  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const initialValues: NoteFormData = {
    content: ''
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData })
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className='space-y-3'
      noValidate
    >
      <div className='flex flex-col gap-2'>
        <label
          className='font-bold'
          htmlFor='content'
        >
          Crear nota
        </label>

        <input
          id='content'
          type='text'
          placeholder='Contenido de la nota'
          className='w-full p-3 border border-gray-300 rounded-md'
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
        />

        {errors.content !== undefined && (
          <ErrorMessage message={errors.content.message ?? ''} />
        )}
      </div>

      <input
        type='submit'
        value={'Crear nota'}
        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer rounded-md'
      />
    </form>
  )
}
