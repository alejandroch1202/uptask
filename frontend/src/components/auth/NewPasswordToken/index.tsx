import PinInput from '@preline/pin-input'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const NewPasswordToken = ({
  setToken
}: {
  setToken: React.Dispatch<React.SetStateAction<string>>
}) => {
  useEffect(() => {
    PinInput.autoInit()
    const tokenInput = PinInput.getInstance('#pin-input') as any

    tokenInput.on('completed', () => {
      const token = tokenInput.currentValue.join('')
      setToken(token)
    })
  }, [])

  return (
    <>
      <form className='space-y-8 p-10 rounded-lg bg-white mt-10'>
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
          to='/auth/olvide-clave'
          className='text-center text-gray-300 font-normal'
        >
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  )
}
