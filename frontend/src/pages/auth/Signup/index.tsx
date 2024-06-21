import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { SignupForm } from '@/types/index'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Link } from 'react-router-dom'
import { signup } from '@/services/auth'

export const Signup = () => {
  const initialValues: SignupForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<SignupForm>({ defaultValues: initialValues })

  const password = watch('password')

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message)
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleRegister = (formData: SignupForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className='text-5xl font-black text-white'>Crear Cuenta</h1>
      <p className='text-2xl font-light text-white mt-5'>
        Llena el formulario para {''}
        <span className=' text-fuchsia-500 font-bold'> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className='space-y-8 p-10  bg-white mt-10'
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label className='font-normal text-2xl'>Nombre</label>
          <input
            type='name'
            placeholder='Nombre de registro'
            className='w-full p-3  border-gray-300 border'
            {...register('name', {
              required: 'El nombre de usuario es obligatorio'
            })}
          />
          {errors.name !== undefined && (
            <ErrorMessage message={errors.name.message ?? ''} />
          )}
        </div>

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
            className='w-full p-3  border-gray-300 border'
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

        <div className='flex flex-col gap-5'>
          <label className='font-normal text-2xl'>Contraseña</label>

          <input
            type='password'
            placeholder='Contraseña de registro'
            className='w-full p-3  border-gray-300 border'
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
            placeholder='Repite la contraseña de registro'
            className='w-full p-3  border-gray-300 border'
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
          value='Registrarme'
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
        />
      </form>

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          to={'/auth/iniciar-sesion'}
          className='text-center text-gray-300 font-normal'
        >
          ¿Ya tienes cuenta? Iniciar sesión
        </Link>
      </nav>
    </>
  )
}
