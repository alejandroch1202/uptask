import { Tabs } from '@/components/profile/Tabs'
import { Outlet } from 'react-router-dom'

export const ProfileLayout = () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  )
}
