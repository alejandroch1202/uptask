import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { findProject } from '@/services/project'
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal'
import { TaskList } from '@/components/tasks/TasksList'
import { EditTaskData } from '@/components/tasks/EditTaskData'
import { TaskDetailsModal } from '@/components/tasks/TaskDetailsModal'

export const ProjectDetails = () => {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => await findProject(projectId!),
    retry: false
  })

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to={'/'} />
  if (data !== undefined) {
    return (
      <>
        <h1 className='text-5xl font-black'>{data.name}</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          {data.description}{' '}
        </p>

        <nav className='my-5 flex gap-3'>
          <button
            onClick={() => {
              navigate('?newTask=true')
            }}
            type='button'
            className='bg-purple-400 hover:bg-purple-400 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
          >
            Agregar tarea
          </button>
        </nav>

        <TaskList tasks={data.tasks} />

        <CreateTaskModal />
        <EditTaskData />
        <TaskDetailsModal />
      </>
    )
  }
}
