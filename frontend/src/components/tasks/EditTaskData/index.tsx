import { findTask } from '@/services/tasks'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { EditTaskModal } from '../EditTaskModal'

export const EditTaskData = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const taskId = queryParams.get('editTask')!

  const params = useParams()
  const projectId = params.projectId!

  const { data, isError } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => await findTask({ projectId, taskId }),
    enabled: taskId !== null,
    retry: false
  })
  if (isError) return <Navigate to={'/404'} />

  if (data !== undefined) return <EditTaskModal data={data} />
}
