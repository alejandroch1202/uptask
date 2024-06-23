import { getUserInfo } from '@/services/auth'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    retry: 1,
    refetchOnWindowFocus: false
  })

  return { data, isLoading, isError }
}
