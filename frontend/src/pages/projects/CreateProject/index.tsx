import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ProjectForm } from '@/components/projects/ProjectForm'
import { createProject } from '@/services/project'
import type { DraftProject } from '@/types/index'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export const CreateProject = () => {
  const navigate = useNavigate()
  const initialValues: DraftProject = {
    name: '',
    client: '',
    description: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      toast.success(data.message)
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleForm = (data: DraftProject) => {
    mutate(data)
  }

  return (
    <>
      <div className='flex justify-between items-center flex-col lg:flex-row gap-2'>
        <div>
          <h1 className='text-5xl font-black'>Crear Proyecto</h1>

          <p className='text-2xl font-light text-gray-500 mt-5'>
            Llena el siguiente formulario para crear un proyecto
          </p>
        </div>

        <nav className='my-5'>
          <Link
            to={'/'}
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors flex items-center justify-center gap-4'
          >
            <ArrowLeftIcon className='h-6 w-6' />
            Volver a Proyectos
          </Link>
        </nav>
      </div>

      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        autoComplete={'off'}
        className='max-w-4xl mx-auto mt-10 bg-white shadow-lg p-10 rounded-lg'
      >
        <ProjectForm
          register={register}
          errors={errors}
        />

        <input
          type='submit'
          value={'Crear proyecto'}
          className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white text-center uppercase font-bold cursor-pointer transition-colors'
        />
      </form>
    </>
  )
}
