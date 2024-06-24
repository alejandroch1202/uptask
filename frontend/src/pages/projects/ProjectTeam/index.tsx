import { AddMemberModal } from '@/components/team/AddMemberModal'
import { useNavigate, Link, useParams } from 'react-router-dom'

export const ProjectTeam = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { projectId } = params

  return (
    <>
      <h1 className='text-5xl font-black'>Administrar colaboradores</h1>
      <p className='text-2xl font-light text-gray-500 mt-5'>
        Administra tu equipo de trabajo para este proyecto
      </p>

      <nav className='my-5 flex gap-3'>
        <button
          onClick={() => {
            navigate('?addMember=true')
          }}
          type='button'
          className='bg-purple-400 hover:bg-purple-400 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
        >
          Agregar colaborador
        </button>

        <Link
          to={`/proyectos/${projectId}`}
          className='bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
        >
          Volver al proyecto
        </Link>
      </nav>

      <AddMemberModal />
    </>
  )
}
