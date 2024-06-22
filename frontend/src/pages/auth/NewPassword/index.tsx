import { NewPasswordForm } from '@/components/auth/NewPasswordForm'
import { NewPasswordToken } from '@/components/auth/NewPasswordToken'
import { validateToken } from '@/services/auth'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const NewPassword = () => {
  const [token, setToken] = useState('')
  const [isValidToken, setIsValidToken] = useState(false)

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onSuccess: (data) => {
      toast.success(data.message)
      setIsValidToken(true)
    },
    onError: (error) => {
      toast.error(error.message)
      setIsValidToken(false)
    }
  })

  useEffect(() => {
    if (token !== '') {
      mutate(token)
    }
  }, [token])

  return (
    <>
      <h1 className='text-5xl font-black text-white'>Restablecer contraseña</h1>
      <p className='text-2xl font-light text-white mt-5'>
        Ingresa el código que recibiste {''}
        <span className=' text-fuchsia-500 font-bold'> por correo</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken setToken={setToken} />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  )
}
