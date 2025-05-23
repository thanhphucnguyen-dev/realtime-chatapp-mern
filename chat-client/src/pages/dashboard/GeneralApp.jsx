import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { Stack, Box } from '@mui/material'

import Chats from '~/pages/dashboard/Chats'
import Conversation from '~/components/Conversation'
import Contact from '~/components/Contact'
import SharedMessages from '~/components/SharedMessages'
import StarredMessages from '~/components/StarredMessages'


const renderSidebarContent = (type) => {
  switch (type) {
  case 'CONTACT':
    return <Contact />
  case 'STARRED':
    return <StarredMessages />
  case 'SHARED':
    return <SharedMessages />
  default:
    return null
  }
}

const GeneralApp = () => {

  const theme = useTheme()
  const { sidebar } = useSelector((store) => store.app )

  const mainContentWidth = sidebar.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)'
  const backgroundColor = theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.paper

  return (
    <Stack direction='row' sx={{ width: '100%', height: '100vh' }}>
      {/* Chats */}
      <Chats />

      <Box sx={{ height: '100%', width: mainContentWidth, backgroundColor }} >
        {/* Conversation */}
        <Conversation />
      </Box>

      {/* Contact */}
      {sidebar.open && renderSidebarContent(sidebar.type)}

    </Stack>
  )
}

export default GeneralApp

