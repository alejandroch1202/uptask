import { Fragment } from 'react'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition
} from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import type { Task } from '@/types/index'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeTask } from '@/services/tasks'
import { toast } from 'react-toastify'

export const TaskCard = ({
  task,
  isAdmin
}: {
  task: Task
  isAdmin: boolean
}) => {
  const params = useParams()
  const navigate = useNavigate()
  const projectId = params.projectId!

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      toast.success(data.message)
    },

    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <li className='p-5 bg-white border border-gray-300 flex justify-between gap-3'>
      <div className='min-w-0 flex flex-col gap-y-4'>
        <button
          onClick={() => {
            navigate(`?viewTask=${task._id}`)
          }}
          type='button'
          className='text-xl font-bold test-gray-600 text-left'
        >
          {task.name}
        </button>

        <p className='text-gray-500'>{task.description}</p>
      </div>

      <div className='flex shrink-0  gap-x-6'>
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
                    navigate(`?viewTask=${task._id}`)
                  }}
                  type='button'
                  className='block px-3 py-1 text-sm leading-6 w-full text-left text-gray-900 hover:bg-gray-100'
                >
                  Ver Tarea
                </button>
              </MenuItem>

              {isAdmin && (
                <>
                  <MenuItem>
                    <button
                      onClick={() => {
                        navigate(`?editTask=${task._id}`)
                      }}
                      type='button'
                      className='block px-3 py-1 text-sm leading-6 w-full text-left text-gray-900 hover:bg-gray-100'
                    >
                      Editar Tarea
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={() => {
                        mutate({ projectId, taskId: task._id })
                      }}
                      type='button'
                      className='block px-3 py-1 text-sm leading-6 text-red-500 w-full text-left hover:bg-gray-100'
                    >
                      Eliminar Tarea
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  )
}
