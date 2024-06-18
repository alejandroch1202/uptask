import { Link } from 'react-router-dom'

export const CreateProject = () => {
  return (
    <>
      <div className='flex  justify-between items-center'>
        <div>
          <h1 className='text-5xl font-black'>Crear Proyecto</h1>

          <p className='text-2xl font-light text-gray-500 mt-5'>
            Llena el siguiente formulario para crear un proyecto
          </p>
        </div>

        <nav className='my-5'>
          <Link
            to={'/'}
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
          >
            Volver a Proyectos
          </Link>
        </nav>
      </div>
    </>
  )
}
