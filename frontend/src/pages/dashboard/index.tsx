import { Fragment } from 'react'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition
} from '@headlessui/react'
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listProjects, removeProject } from '@/services/project'
import { toast } from 'react-toastify'

export const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: listProjects
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  if (isLoading) return <p>Cargando...</p>

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

      {data !== undefined && data?.length > 0 ? (
        <ul
          role='list'
          className='divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg'
        >
          {data.map((project) => (
            <li
              key={project._id}
              className='flex justify-between gap-x-6 px-5 py-10'
            >
              <div className='flex min-w-0 gap-x-4'>
                <div className='min-w-0 flex-auto space-y-2'>
                  <Link
                    to={`/proyectos/${project._id}`}
                    className='text-gray-600 cursor-pointer hover:underline text-3xl font-bold'
                  >
                    {project.name}
                  </Link>
                  <p className='text-sm text-gray-400'>
                    Cliente: {project.client}
                  </p>
                  <p className='text-sm text-gray-400'>{project.description}</p>
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
                        <Link
                          to={`/proyectos/${project._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100'
                        >
                          Ver proyecto
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={`/proyectos/${project._id}/editar`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100'
                        >
                          Editar proyecto
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => {
                            mutate(project._id)
                          }}
                          type='button'
                          className='block px-3 py-1 text-sm leading-6 w-full text-start text-red-500 hover:bg-gray-100'
                        >
                          Eliminar proyecto
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
        <p className='text-center py-20'>
          No hay proyectos aún, {''}
          <span>
            <Link
              to={'/proyectos/crear'}
              className='text-fuchsia-500 font-bold'
            >
              crea uno aquí
            </Link>
          </span>
        </p>
      )}
    </>
  )
}
