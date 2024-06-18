import { PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <>
      <div className='flex  justify-between items-center'>
        <div>
          <h1 className='text-5xl font-black'>Mis Proyectos</h1>

          <p className='text-2xl font-light text-gray-500 mt-5'>
            Maneja y administra tus proyectos
          </p>
        </div>

        <nav className='my-5'>
          <Link
            to={'/proyectos/crear'}
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors flex items-center justify-center gap-4'
          >
            <PlusIcon className='h-6 w-6' />
            Nuevo proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
