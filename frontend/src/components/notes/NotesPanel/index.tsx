import type { Task } from '@/types/index'
import { AddNoteForm } from '../AddNoteForm'
import { NoteDetails } from '../NoteDetails'

export const NotesPanel = ({ notes }: { notes: Task['notes'] }) => {
  return (
    <>
      <AddNoteForm />

      <div className='divide-y divide-gray-100 mt-10'>
        {notes.length > 0 ? (
          <>
            <p className='font-bold text-2xl text-gray-600 my-5'>Notas</p>
            {notes.map((note) => (
              <NoteDetails
                key={note._id}
                note={note}
              />
            ))}
          </>
        ) : (
          <p className='text-gray-500 text-center pt-3'>No notes yet</p>
        )}
      </div>
    </>
  )
}
