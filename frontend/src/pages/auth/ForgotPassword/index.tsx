import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import type { ForgotPasswordForm } from '@/types/index'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { forgotPassword } from '@/services/auth'

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message)
      reset()
      navigate('/auth/cambiar-clave')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className='text-5xl font-black text-white'>
        ¿Olvidaste tu contraseña?
      </h1>
      <p className='text-2xl font-light text-white mt-5'>
        Llena el formulario para {''}
        <span className=' text-fuchsia-500 font-bold'> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className='space-y-8 p-10 bg-white rounded-lg mt-10'
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label
            className='font-normal text-2xl'
            htmlFor='email'
          >
            Correo
          </label>
          <input
            id='email'
            type='email'
            placeholder='Correo de registro'
            className='w-full p-3  border-gray-300 border rounded-lg'
            {...register('email', {
              required: 'El correo de registro es obligatorio',
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
          value='Enviar instrucciones'
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-md'
        />
      </form>

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          to='/auth/iniciar-sesion'
          className='text-center text-gray-300 font-normal'
        >
          ¿Ya tienes cuenta? <b>Iniciar sesión</b>
        </Link>

        <Link
          to='/auth/registrarse'
          className='text-center text-gray-300 font-normal'
        >
          ¿No tienes cuenta? <b>Crear cuenta</b>
        </Link>
      </nav>
    </>
  )
}
