import { Fragment } from 'react'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition
} from '@headlessui/react'
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { listProjects } from '@/services/project'
import { Spinner } from '@/components/common/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { DeleteProjectModal } from '@/components/projects/DeleteProjectModal'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { data: user, isLoading: userLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: listProjects
  })

  if (isLoading && userLoading) return <Spinner />

  if (data !== undefined && user !== undefined) {
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

        {data.length > 0 ? (
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
                    {isManager(project.manager, user._id) ? (
                      <div className='mb-2'>
                        <p className='font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5'>
                          Manager
                        </p>
                      </div>
                    ) : (
                      <div className='mb-2'>
                        <p className='font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5'>
                          Colaborador
                        </p>
                      </div>
                    )}

                    <Link
                      to={`/proyectos/${project._id}`}
                      className='text-gray-600 cursor-pointer hover:underline text-3xl font-bold'
                    >
                      {project.name}
                    </Link>
                    <p className='text-sm text-gray-400'>
                      Cliente: {project.client}
                    </p>
                    <p className='text-sm text-gray-400'>
                      {project.description}
                    </p>
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

                        {isManager(project.manager, user._id) && (
                          <>
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
                                  navigate('' + `?deleteProject=${project._id}`)
                                }}
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 w-full text-start text-red-500 hover:bg-gray-100'
                              >
                                Eliminar proyecto
                              </button>
                            </MenuItem>
                          </>
                        )}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-center'>
            <div className='max-w-96 mx-auto'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#a855f7'
                aria-hidden='true'
              >
                <path
                  vectorEffect='non-scaling-stroke'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                />
              </svg>
              <h3 className='mt-2 font-medium text-gray-900'>
                No hay proyectos aún
              </h3>
              <p className='mt-1 text-purple-600'>
                Empieza creando un nuevo proyecto
              </p>
            </div>
          </div>
        )}

        <DeleteProjectModal />
      </>
    )
  }
}
