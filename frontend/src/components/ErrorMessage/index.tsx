export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className='text-center my-4 bg-red-100 text-red-600 p-3 font-bold uppercase text-sm'>
      {message}
    </div>
  )
}
