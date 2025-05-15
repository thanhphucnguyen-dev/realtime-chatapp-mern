import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'


const DashboardLayout = () => {

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
