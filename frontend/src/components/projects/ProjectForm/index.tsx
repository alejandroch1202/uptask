import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@/components/ErrorMessage'
import type { DraftProject } from '@/types/index'

interface ProjectFormProps {
  register: UseFormRegister<DraftProject>
  errors: FieldErrors<DraftProject>
}

export const ProjectForm = ({ register, errors }: ProjectFormProps) => {
  return (
    <>
      <div className='mb-5 space-y-3'>
        <label
          htmlFor='name'
          className='text-sm uppercase font-bold'
        >
          Nombre del proyecto
        </label>
        <input
          id='name'
          className='w-full p-3  border border-gray-200'
          type='text'
          placeholder='Nombre del Proyecto'
          {...register('name', {
            required: 'El Titulo del Proyecto es obligatorio'
          })}
        />

        {errors.name !== undefined && (
          <ErrorMessage message={errors.name.message ?? ''} />
        )}
      </div>

      <div className='mb-5 space-y-3'>
        <label
          htmlFor='client'
          className='text-sm uppercase font-bold'
        >
          Nombre del cliente
        </label>
        <input
          id='client'
          className='w-full p-3  border border-gray-200'
          type='text'
          placeholder='Nombre del Cliente'
          {...register('client', {
            required: 'El Nombre del Cliente es obligatorio'
          })}
        />

        {errors.client !== undefined && (
          <ErrorMessage message={errors.client.message ?? ''} />
        )}
      </div>

      <div className='mb-5 space-y-3'>
        <label
          htmlFor='description'
          className='text-sm uppercase font-bold'
        >
          Descripción
        </label>
        <textarea
          id='description'
          className='w-full p-3  border border-gray-200'
          placeholder='Descripción del Proyecto'
          {...register('description', {
            required: 'Una descripción del proyecto es obligatoria'
          })}
        />

        {errors.description !== undefined && (
          <ErrorMessage message={errors.description.message ?? ''} />
        )}
      </div>
    </>
  )
}
