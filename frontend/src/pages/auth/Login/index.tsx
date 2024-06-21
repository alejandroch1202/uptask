import { useForm } from 'react-hook-form'
import type { LoginForm } from '@/types/index'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Link } from 'react-router-dom'

export const Login = () => {
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const handleLogin = (formData: LoginForm) => {}

  return (
    <>
      <h1 className='text-5xl font-black text-white'>Iniciar sesión</h1>
      <p className='text-2xl font-light text-white mt-5'>
        Llena el formulario para {''}
        <span className=' text-fuchsia-500 font-bold'> iniciar sesión</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className='space-y-8 p-10 bg-white mt-10'
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label
            htmlFor='email'
            className='font-normal text-2xl'
          >
            Correo
          </label>

          <input
            id='email'
            type='email'
            placeholder='Correo de registro'
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

        <div className='flex flex-col gap-5'>
          <label
            htmlFor='password'
            className='font-normal text-2xl'
          >
            Contraseña
          </label>

          <input
            id='password'
            type='password'
            placeholder='Contraseña de registro'
            className='w-full p-3  border-gray-300 border'
            {...register('password', {
              required: 'La contraseña es obligatoria'
            })}
          />
          {errors.password !== undefined && (
            <ErrorMessage message={errors.password.message ?? ''} />
          )}
        </div>

        <input
          type='submit'
          value='Iniciar sesión'
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
        />
      </form>

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          to={'/auth/registrarse'}
          className='text-center text-gray-300 font-normal'
        >
          ¿No tienes cuenta? Crear cuenta
        </Link>
      </nav>
    </>
  )
}
