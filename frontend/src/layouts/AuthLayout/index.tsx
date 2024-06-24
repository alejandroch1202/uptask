import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Logo } from '@/components/common/Logo'

export const AuthLayout = () => {
  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <div className='py-10 lg:py-20 mx-auto w-[450px]'>
          <Logo />

          <div className='mt-10'>
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer
        hideProgressBar
        pauseOnFocusLoss={false}
      />
    </>
  )
}
