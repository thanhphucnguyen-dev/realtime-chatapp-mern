// React & Redux
import { useDispatch } from 'react-redux'

// MUI Components
import {
  Box,
  Stack,
  Typography,
  IconButton
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import { CaretLeft } from 'phosphor-react'

// Redux Actions
import { UpdateSidebarType } from '../redux/slices/app'

// Internal Components
import Message from './Conversation/Message'


const StarredMessages = () => {

  const theme = useTheme()
  const dispatch = useDispatch()

  const handleBack = () => {
    dispatch(UpdateSidebarType('CONTACT'))
  }

  const isLight = theme.palette.mode === 'light'

  return (
    <Box
      sx={{
        width: 320,
        height: '100vh'
      }}
    >
      <Stack sx={{ height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25',
            width: '100%',
            backgroundColor: isLight ? '#F8FAFF' : theme.palette.background
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={3}
            sx={{ height: '100%', p: 2 }}
          >
            <IconButton onClick={handleBack}>
              <CaretLeft />
            </IconButton>
            <Typography variant='subtitle2'>Starred Messages</Typography>
          </Stack>
        </Box>

        {/* Body */}
        <Stack
          p={3}
          spacing={3}
          sx={{
            flexGrow: 1,
            position: 'relative',
            overflowY: 'scroll',
            height: '100%'
          }}
        >
          <Message />
        </Stack>

      </Stack>
    </Box>
  )
}

export default StarredMessages
