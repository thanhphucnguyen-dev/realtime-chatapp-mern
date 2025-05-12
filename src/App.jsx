
import './App.css'
import DashboardLayout from './layouts/dashboard'
import GeneralApp from './pages/dashboard/GeneralApp'
import { Box } from '@mui/material'

function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <DashboardLayout />
      </Box>
      <Box>
        <GeneralApp />
      </Box>
    </Box>

  )
}

export default App
