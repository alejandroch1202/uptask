import { Fragment } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TaskForm } from '../TaskForm'
import type { DraftTask } from '@/types/index'
import { useForm } from 'react-hook-form'

export const CreateTaskForm = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const modalTask = queryParams.get('newTask')
  const show = modalTask === 'true'

  const initialValues: DraftTask = {
    name: '',
    description: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const handleCreateTask = (formData: DraftTask) => {
    console.log(formData)
  }

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
                  <DialogTitle
                    as='h3'
                    className='font-black text-4xl  my-5'
                  >
                    Nueva Tarea
                  </DialogTitle>

                  <p className='text-xl font-bold'>
                    Llena el formulario y crea {''}
                    <span className='text-fuchsia-600'>una tarea</span>
                  </p>

                  <form
                    onSubmit={handleSubmit(handleCreateTask)}
                    noValidate
                    className='mt-10 space-y-3'
                  >
                    <TaskForm
                      register={register}
                      errors={errors}
                    />

                    <input
                      type='submit'
                      value={'Guardar tarea'}
                      className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white text-center uppercase font-bold cursor-pointer transition-colors'
                    />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
