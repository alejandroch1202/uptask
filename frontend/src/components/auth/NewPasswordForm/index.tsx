import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@/components/ErrorMessage'
import type { ResetPasswordForm } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { updatePassword } from '@/services/auth'
import { toast } from 'react-toastify'

export const NewPasswordForm = ({ token }: { token: string }) => {
  const navigate = useNavigate()
  const initialValues: ResetPasswordForm = {
    password: '',
    confirmPassword: ''
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const password = watch('password')

  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success(data.message)
      reset()
      navigate('/auth/iniciar-sesion')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleNewPassword = (formData: ResetPasswordForm) => {
    mutate({ ...formData, token })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className='space-y-8 p-10 bg-white mt-10 rounded-lg'
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label className='font-normal text-2xl'>Contraseña</label>

          <input
            type='password'
            placeholder='Contraseña de registro'
            className='w-full p-3  border-gray-300 border rounded-md'
            {...register('password', {
              required: 'La contraseña es obligatoria',
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

        <div className='flex flex-col gap-5'>
          <label className='font-normal text-2xl'>Repetir contraseña</label>

          <input
            id='confirmPassword'
            type='password'
            placeholder='Repite contraseña de registro'
            className='w-full p-3  border-gray-300 border rounded-md'
            {...register('confirmPassword', {
              required: 'Repetir la contraseña es obligatorio',
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
          value='Establecer contraseña'
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-md'
        />
      </form>
    </>
  )
}
