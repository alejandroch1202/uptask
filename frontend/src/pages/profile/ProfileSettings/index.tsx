import { Spinner } from '@/components/common/Spinner'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { useAuth } from '@/hooks/useAuth'

export const ProfileSettings = () => {
  const { data, isLoading } = useAuth()

  if (isLoading) return <Spinner />

  if (data !== undefined) return <ProfileForm data={data} />
}
