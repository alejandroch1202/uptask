import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import type { UpdateCurrentPasswordForm } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { updateCurrentPassword } from '@/services/auth'
import { toast } from 'react-toastify'

export const ChangePassword = () => {
  const initialValues: UpdateCurrentPasswordForm = {
    oldPassword: '',
    password: '',
    confirmPassword: ''
  }

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const password = watch('password')

  const { mutate } = useMutation({
    mutationFn: updateCurrentPassword,
    onSuccess: (data) => {
      reset()
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleChangePassword = (formData: UpdateCurrentPasswordForm) => {
    mutate({ formData })
  }

  return (
    <>
      <div className='mx-auto max-w-3xl'>
        <h1 className='text-5xl font-black '>Cambiar contraseña</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Utiliza este formulario para cambiar tu contraseña
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=' mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg'
          noValidate
        >
          <div className='mb-5 space-y-3'>
            <label
              className='text-sm uppercase font-bold'
              htmlFor='oldPassword'
            >
              Contraseña actual
            </label>
            <input
              id='oldPassword'
              type='password'
              placeholder='Contraseña actual'
              className='w-full p-3  border border-gray-200'
              {...register('oldPassword', {
                required: 'La contraseña actual es obligatoria'
              })}
            />
            {errors.oldPassword !== undefined && (
              <ErrorMessage message={errors.oldPassword.message ?? ''} />
            )}
          </div>

          <div className='mb-5 space-y-3'>
            <label
              className='text-sm uppercase font-bold'
              htmlFor='password'
            >
              Contraseña nueva
            </label>
            <input
              id='password'
              type='password'
              placeholder='Contraseña nueva'
              className='w-full p-3  border border-gray-200'
              {...register('password', {
                required: 'La contraseña nueva es obligatoria',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.password !== undefined && (
              <ErrorMessage message={errors.password.message ?? ''} />
            )}
          </div>
          <div className='mb-5 space-y-3'>
            <label
              htmlFor='confirmPassword'
              className='text-sm uppercase font-bold'
            >
              Repetir la contraseña
            </label>

            <input
              id='confirmPassword'
              type='password'
              placeholder='Repetir la contraseña'
              className='w-full p-3  border border-gray-200'
              {...register('confirmPassword', {
                required: 'Este campo es obligatorio',
                validate: (value) =>
                  value === password || 'Las contraseñas no son iguales'
              })}
            />
            {errors.confirmPassword !== undefined && (
              <ErrorMessage message={errors.confirmPassword.message ?? ''} />
            )}
          </div>

          <input
            type='submit'
            value='Guardar cambios'
            className='bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors'
          />
        </form>
      </div>
    </>
  )
}
