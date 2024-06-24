import { addUserToProject } from '@/services/team'
import type { TeamMember } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const SearchResult = ({
  user,
  reset
}: {
  user: TeamMember
  reset: () => void
}) => {
  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
      toast.success(data.message)
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleClick = () => {
    mutate({
      projectId,
      id: user._id
    })
  }

  return (
    <>
      <p className='mt-10 text-center font-bold'> Resultado</p>

      <div className='flex justify-between items-center'>
        <p>{user.name}</p>
        <button
          onClick={handleClick}
          className='text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer'
          type='button'
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  )
}
