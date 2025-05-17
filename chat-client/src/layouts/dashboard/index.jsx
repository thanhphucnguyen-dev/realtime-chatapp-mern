import { Stack } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from './SideBar'

const isAuthenticated = true

const DashboardLayout = () => {

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' />
  }

  return (
    <Stack direction='row'>
      {/* SideBar */}
      <SideBar />
      {/* Nội dung trang */}
      <Outlet />
    </Stack>
  )
}

export default DashboardLayout
