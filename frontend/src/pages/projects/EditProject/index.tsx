import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { findProject } from '@/services/project'
import { EditProjectForm } from '@/components/projects/EditProjectForm'
import { Spinner } from '@/components/common/Spinner'

export const EditProject = () => {
  const { projectId } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: async () => await findProject(projectId!),
    retry: false
  })

  if (isLoading) return <Spinner />
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
