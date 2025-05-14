import Chats from './Chats'
import { useTheme } from '@mui/material/styles'
import { Stack, Box } from '@mui/material'
import Conversation from '../../components/Conversation'
import Contact from '../../components/Contact'
import { useSelector } from 'react-redux'
const GeneralApp = () => {

  const theme = useTheme()
  const { sidebar } = useSelector((store) => store.app )

  return (
    <Stack direction={'row'} sx={{ width: '100%', height: '100vh' }}>
      {/* Chats */}
      <Chats />

      <Box
        sx={{
          height: '100%',
          width: sidebar.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F0F4FA'
              : theme.palette.background.paper
        }}
      >
        {/* Conversation */}
        <Conversation />
      </Box>
      {/* Contact */}
      {sidebar.open && <Contact />}
    </Stack>
  )
}

export default GeneralApp
