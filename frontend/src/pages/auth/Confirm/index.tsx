import { Link, useNavigate } from 'react-router-dom'
import PinInput from '@preline/pin-input'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { confirmAccount } from '@/services/auth'
import { toast } from 'react-toastify'

export const Confirm = () => {
  const navigate = useNavigate()
  useEffect(() => {
    PinInput.autoInit()
    const tokenInput = PinInput.getInstance('#pin-input') as any

    tokenInput.on('completed', () => {
      const token = tokenInput.currentValue.join('')
      mutate(token)
    })
  }, [])

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data.message)
      navigate('/auth/iniciar-sesion')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <>
      <h1 className='text-5xl font-black text-white'>Confirma tu cuenta</h1>
      <p className='text-2xl font-light text-white mt-5'>
        Ingresa el código que recibiste {''}
        <span className=' text-fuchsia-500 font-bold'> por correo</span>
      </p>

      <form className='space-y-8 p-10 bg-white mt-10 rounded-lg'>
        <label className='font-normal text-2xl text-center block'>
          Código de 6 dígitos
        </label>

        <div
          id='pin-input'
          className='flex justify-center gap-3'
          data-hs-pin-input
        >
          <input
            id='1'
            type='text'
            className='h-10 w-10 text-center border border-gray-300 rounded-md'
            data-hs-pin-input-item
            autoFocus
          />
          <input
            type='text'
            className='h-10 w-10 text-center border border-gray-300 rounded-md'
            data-hs-pin-input-item
          />
          <input
            type='text'
            className='h-10 w-10 text-center border border-gray-300 rounded-md'
            data-hs-pin-input-item
          />
          <input
            type='text'
            className='h-10 w-10 text-center border border-gray-300 rounded-md'
            data-hs-pin-input-item
          />
          <input
            type='text'
            className='h-10 w-10 text-center border border-gray-300 rounded-md'
            data-hs-pin-input-item
          />
          <input
            type='text'
            className='h-10 w-10 text-center border border-gray-300 rounded-md'
            data-hs-pin-input-item
          />
        </div>
      </form>

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          to='/auth/solicitar-codigo'
          className='text-center text-gray-300 font-normal'
        >
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  )
}
