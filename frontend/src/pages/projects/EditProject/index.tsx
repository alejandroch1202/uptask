import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { findProject } from '@/services/project'
import { EditProjectForm } from '@/components/projects/EditProjectForm'

export const EditProject = () => {
  const { projectId } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: async () => await findProject(projectId!),
    retry: false
  })

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to={'/'} />
  if (data !== undefined) {
    return (
      <EditProjectForm
        data={data}
        projectId={projectId!}
      />
    )
  }
}
