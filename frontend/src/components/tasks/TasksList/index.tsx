import type { Project, TaskProject, TaskStatus } from '@/types/index'
import { TaskCard } from '../TaskCard'
import { DropTask } from '../DropTask'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { updateTaskStatus } from '@/services/tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

interface TaskListProps {
  tasks: TaskProject[]
  isAdmin: boolean
}

type GroupedTasks = Record<string, TaskProject[]>

const initialStatusGroup: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: []
}

export const statusTranslations: Record<string, string> = {
  pending: 'Pendiente',
  onHold: 'En espera',
  inProgress: 'En progreso',
  underReview: 'En revisión',
  completed: 'Completado'
}

const statusColors: Record<string, string> = {
  pending: 'border-t-gray-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-emerald-500'
}

export const TaskList = ({ tasks, isAdmin }: TaskListProps) => {
  const params = useParams()
  const projectId = params.projectId!

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      toast.success(data.message)
      navigate('', { replace: true })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status]
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup }
  }, initialStatusGroup)

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (over?.id !== undefined) {
      const taskId = active.id.toString()
      const status = over.id as TaskStatus

      mutate({ projectId, taskId, status })
      queryClient.setQueryData(['project', projectId], (prevData: Project) => {
        const updatedTasks = prevData.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status }
          }
          return task
        })

        return {
          ...prevData,
          tasks: updatedTasks
        }
      })
    }
  }

  return (
    <>
      <h2 className='text-5xl font-black my-10'>Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div
              key={status}
              className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'
            >
              <h3
                className={`capitalize text-xl font-light border border-gray-300 bg-white p-3 border-t-8 ${statusColors[status]}`}
              >
                {statusTranslations[status]}
              </h3>

              <DropTask status={status} />

              <ul className='mt-5 space-y-5'>
                {tasks.length === 0 ? (
                  <li className='text-gray-500 text-center pt-3 border border-dashed h-28'>
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      isAdmin={isAdmin}
                    />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  )
}
