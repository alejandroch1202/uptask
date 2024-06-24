import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { findMemberByEmail } from '@/services/team'
import type { TeamMemberForm } from '@/types/index'
import { SearchResult } from '../SearchResult'

export const AddMemberForm = () => {
  const initialValues: TeamMemberForm = {
    email: ''
  }
  const params = useParams()
  const projectId = params.projectId!

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const { mutate, isPending, isError, error, data, reset } = useMutation({
    mutationFn: findMemberByEmail
  })

  const handleSearchUser = async (formData: TeamMemberForm) => {
    mutate({ projectId, formData })
  }

  const resetAll = () => {
    resetForm()
    reset()
  }

  return (
    <>
      <form
        className='mt-10 space-y-5'
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label
            className='font-normal text-2xl'
            htmlFor='name'
          >
            Correo del usuario
          </label>
          <input
            id='name'
            type='text'
            placeholder='Correo del usuario a agregar'
            className='w-full p-3  border-gray-300 border'
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Correo no válido'
              }
            })}
          />
          {errors.email !== undefined && (
            <ErrorMessage message={errors.email.message ?? ''} />
          )}
        </div>

        <input
          type='submit'
          disabled={isPending}
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed'
          value={'Buscar usuario'}
        />
      </form>

      {isPending && (
        <div className='mt-10'>
          <p className='text-center'>Buscando usuario...</p>
        </div>
      )}

      {isError && (
        <div className='mt-10'>
          <p className='text-center'>{error.message}</p>
        </div>
      )}

      {data !== undefined && (
        <div className='mt-10'>
          <SearchResult
            reset={resetAll}
            user={data}
          />
        </div>
      )}
    </>
  )
}
