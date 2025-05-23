import React, { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider
} from '@mui/material'
import { MagnifyingGlass, Plus, UsersThree } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { SimpleBarStyle } from '~/components/Scrollbar'
import { ChatList } from '~/data'
import ChatElement from '~/components/ChatElement'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '~/components/Search'
import CreateGroup from '~/sections/main/CreateGroup'

const ChatSection = ({ title, chats }) => (
  <>
    <Typography variant="subtitle2" sx={{ color: '#676667' }}>
      {title}
    </Typography>
    {chats.map((chat) => (
      <ChatElement key={chat.id} {...chat} />
    ))}
  </>
)

const Group = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const theme = useTheme()

  const handleCloseDialog = () => { setOpenDialog(false) }
  const handleOpenDialog = () => { setOpenDialog(true) }


  return (
    <>
      <Stack direction='row' sx={{ width: '100%' }} >
        {/* Left */}
        <Box
          sx={{
            height: '100vh',
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            width: 320,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack
            p={3}
            spacing={2}
            sx={{ maxHeight: '100vh' }}
          >
            {/* Title */}
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ px: 2, py: 1 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  background: 'linear-gradient(to right, #4facfe, #00f2fe)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Groups
              </Typography>

              <IconButton size='large'>
                <UsersThree />
              </IconButton>
            </Stack>

            {/* Search */}
            <Stack sx={{ width: '100%' }}>
              <Search
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[800],
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700]
                  },
                  border: `1px solid ${
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[300]
                      : theme.palette.grey[600]
                  }`,
                  boxShadow:
                theme.palette.mode === 'light'
                  ? '0 1px 2px rgba(0,0,0,0.08)'
                  : '0 1px 2px rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease'
                }}
              >
                <SearchIconWrapper
                  sx={{
                    padding: 1.5,
                    height: '100%',
                    position: 'absolute',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MagnifyingGlass color='#709CE6' />
                </SearchIconWrapper>

                <StyledInputBase
                  placeholder='Search...'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Stack>

            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='subtitle2' component={Link}> Create New Group </Typography>
              <IconButton onClick={handleOpenDialog} >
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />

            <Stack spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  <ChatSection title="Pinned" chats={ChatList.filter((el) => el.pinned)} />
                  <ChatSection title="All Groups" chats={ChatList.filter((el) => !el.pinned)} />
                </Stack>

              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        {/* TODO => Reuse Conversation Components */}
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} /> }
    </>
  )
}

export default Group
