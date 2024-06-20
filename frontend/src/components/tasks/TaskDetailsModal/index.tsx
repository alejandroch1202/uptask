import { Fragment } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { findTask } from '@/services/tasks'
import { formatDate } from '@/utils/index'
// import { toast } from 'react-toastify'

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

  if (isError) {
    // toast.error(error.message, { toastId: 'error' })
    return <Navigate to={`/proyectos/${projectId}`} />
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
                    <div className='my-5 space-y-3'>
                      <label className='font-bold'>{data.status}</label>
                    </div>
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
