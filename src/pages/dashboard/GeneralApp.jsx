import Chats from './Chats'
import { useTheme } from '@mui/material/styles'
import { Stack, Box } from '@mui/material'
import Conversation from '../../components/Conversation'
const GeneralApp = () => {

  const theme = useTheme()

  return (
    <Stack direction={'row'} sx={{ width: '100%', height: '100vh' }}>
      {/* Chats */}
      <Chats />

      <Box
        sx={{
          height: '100%',
          width: 'calc(100vw - 440px)',
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
        }}
      >
        {/* Conversation */}
        <Conversation />
      </Box>
    </Stack>
  )
}

export default GeneralApp
