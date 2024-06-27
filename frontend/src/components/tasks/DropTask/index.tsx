import { useDroppable } from '@dnd-kit/core'

export const DropTask = ({ status }: { status: string }) => {
  const { isOver, setNodeRef } = useDroppable({ id: status })

  const style = {
    opacity: isOver ? 0.4 : undefined
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className='text-xs font-semibold uppercase p-2 border border-dashed border-gray-500 mt-5 grid place-content-center text-gray-500'
    >
      Soltar tarea aquí
    </div>
  )
}
