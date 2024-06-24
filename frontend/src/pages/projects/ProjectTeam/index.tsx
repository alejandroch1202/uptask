import { useNavigate, Link, useParams, Navigate } from 'react-router-dom'
import { Fragment } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@/components/common/Spinner'
import { AddMemberModal } from '@/components/team/AddMemberModal'
import { listMembers, removeUserFromProject } from '@/services/team'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'

export const ProjectTeam = () => {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: async () => await listMembers({ projectId }),
    retry: false
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  if (isLoading) return <Spinner />
  if (isError) return <Navigate to={'404'} />

  if (data !== undefined) {
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

        <h3 className='text-4xl font-black my-10'>Miembros actuales</h3>

        {data.length > 0 ? (
          <ul
            role='list'
            className='divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg'
          >
            {data?.map((member) => (
              <li
                key={member._id}
                className='flex justify-between gap-x-6 px-5 py-10'
              >
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto space-y-2'>
                    <p className='text-2xl font-black text-gray-600'>
                      {member.name}
                    </p>
                    <p className='text-sm text-gray-400'>{member.email}</p>
                  </div>
                </div>

                <div className='flex shrink-0 items-center gap-x-6'>
                  <Menu
                    as='div'
                    className='relative flex-none'
                  >
                    <MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
                      <span className='sr-only'>opciones</span>
                      <EllipsisVerticalIcon
                        className='h-9 w-9'
                        aria-hidden='true'
                      />
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                        <MenuItem>
                          <button
                            onClick={() => {
                              mutate({ projectId, id: member._id })
                            }}
                            type='button'
                            className='block px-3 py-1 text-sm leading-6 text-red-500 w-full text-left hover:bg-gray-100'
                          >
                            Eliminar del Proyecto
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center py-20'>No hay miembros en este equipo</p>
        )}

        <AddMemberModal />
      </>
    )
  }
}
