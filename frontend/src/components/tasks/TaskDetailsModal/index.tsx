import { Fragment } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { findTask, updateTaskStatus } from '@/services/tasks'
import { formatDate } from '@/utils/index'
import { statusTranslations } from '../TasksList'
import { toast } from 'react-toastify'
import type { TaskStatus } from '@/types/index'
import { NotesPanel } from '@/components/notes/NotesPanel'

export const TaskDetailsModal = () => {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const taskId = queryParams.get('viewTask')!
  const show = taskId !== null

  const { data, isError } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => await findTask({ projectId, taskId }),
    retry: false,
    enabled: show
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data.message)
      navigate('', { replace: true })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus
    mutate({ projectId, taskId, status })
  }

  if (isError) {
    // toast.error(error.message, { toastId: 'error' })
    return <Navigate to={'/404'} />
  }

  if (data !== undefined) {
    return (
      <>
        <Transition
          appear
          show={show}
          as={Fragment}
        >
          <Dialog
            as='div'
            className='relative z-10'
            onClose={() => {
              navigate('', { replace: true })
            }}
          >
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black/60' />
            </TransitionChild>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <TransitionChild
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <DialogPanel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16'>
                    <p className='text-sm text-slate-400'>
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className='text-sm text-slate-400'>
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <DialogTitle
                      as='h3'
                      className='font-black text-4xl text-slate-600 my-5'
                    >
                      {data.name}
                    </DialogTitle>
                    <p className='text-lg text-slate-500 mb-2'>
                      {data.description}
                    </p>

                    {data.updatedBy.length > 0 && (
                      <>
                        <p className='font-bold text-2xl text-gray-600 my-5'>
                          Historial de cambios
                        </p>

                        <ol className='list-decimal'>
                          {data.updatedBy.map((activity) => (
                            <li
                              key={activity._id}
                              className='my-2 ml-8'
                            >
                              <span className='font-bold text-gray-600'>
                                {statusTranslations[activity.status]} por {''}
                              </span>
                              {activity.user.name}
                            </li>
                          ))}
                        </ol>
                      </>
                    )}

                    <div className='my-5 space-y-3'>
                      <label
                        htmlFor='status'
                        className='font-bold'
                      >
                        Estado actual
                      </label>
                      <select
                        onChange={handleChange}
                        className='w-full p-3 border border-gray-300 rounded-lg text-slate-600'
                        name='status'
                        id='status'
                        defaultValue={data.status}
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option
                              key={key}
                              value={key}
                            >
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <NotesPanel notes={data.notes} />
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }
}
