import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import type { User, UserProfileForm } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserInfo } from '@/services/auth'
import { toast } from 'react-toastify'

export const ProfileForm = ({ data }: { data: User }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: data })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success(data.message)
    },

    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleEditProfile = (formData: UserProfileForm) => {
    mutate({ formData })
  }

  return (
    <>
      <div className='mx-auto max-w-3xl g'>
        <h1 className='text-5xl font-black '>Mi Perfil</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=' mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l'
          noValidate
        >
          <div className='mb-5 space-y-3'>
            <label
              className='text-sm uppercase font-bold'
              htmlFor='name'
            >
              Nombre
            </label>
            <input
              id='name'
              type='text'
              placeholder='Tu Nombre'
              className='w-full p-3  border border-gray-200'
              {...register('name', {
                required: 'Nombre de usuario es obligatoro'
              })}
            />

            {errors.name !== undefined && (
              <ErrorMessage message={errors.name.message ?? ''} />
            )}
          </div>

          <div className='mb-5 space-y-3'>
            <label
              className='text-sm uppercase font-bold'
              htmlFor='password'
            >
              E-mail
            </label>
            <input
              id='text'
              type='email'
              placeholder='Tu Email'
              className='w-full p-3  border border-gray-200'
              {...register('email', {
                required: 'EL e-mail es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'E-mail no válido'
                }
              })}
            />

            {errors.email !== undefined && (
              <ErrorMessage message={errors.email.message ?? ''} />
            )}
          </div>
          <input
            type='submit'
            value='Guardar Cambios'
            className='bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors'
          />
        </form>
      </div>
    </>
  )
}
