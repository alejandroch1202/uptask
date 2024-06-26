import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { DraftTask } from '@/types/index'
import { ErrorMessage } from '@/components/common/ErrorMessage'

interface TaskFormProps {
  errors: FieldErrors<DraftTask>
  register: UseFormRegister<DraftTask>
}

export const TaskForm = ({ errors, register }: TaskFormProps) => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <label
          className='font-normal text-2xl'
          htmlFor='name'
        >
          Nombre de la tarea
        </label>
        <input
          id='name'
          type='text'
          placeholder='Nombre de la tarea'
          className='w-full p-3  border-gray-300 border'
          {...register('name', {
            required: 'El nombre de la tarea es obligatorio'
          })}
        />
        {errors.name !== undefined && (
          <ErrorMessage message={errors.name.message ?? ''} />
        )}
      </div>

      <div className='flex flex-col gap-5'>
        <label
          className='font-normal text-2xl'
          htmlFor='description'
        >
          Descripción de la tarea
        </label>
        <textarea
          id='description'
          placeholder='Descripción de la tarea'
          className='w-full p-3  border-gray-300 border'
          {...register('description', {
            required: 'La descripción de la tarea es obligatoria'
          })}
        />
        {errors.description !== undefined && (
          <ErrorMessage message={errors.description.message ?? ''} />
        )}
      </div>
    </>
  )
}
