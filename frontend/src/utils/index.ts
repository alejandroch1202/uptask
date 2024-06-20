export const formatDate = (data: string) => {
  const date = new Date(data)
  const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formatter.format(date)
}
