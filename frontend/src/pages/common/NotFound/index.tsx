import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <section>
      <div className='py-8 px-4 mx-auto max-w-screen-xl'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-purple-400'>
            404
          </h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl'>
            Página no encontrada
          </p>
          <p className='mb-4 text-lg font-light text-white'>
            La página que estas buscando no existe.
          </p>
          <Link
            to={'/'}
            className='inline-flex text-white bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none text-lg focus:ring-purple-300 font-medium rounded-lg px-5 py-3 text-center my-4'
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
