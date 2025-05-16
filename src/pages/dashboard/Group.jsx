import React, { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider
} from '@mui/material'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '../../components/Search'
import CreateGroup from '../../sections/main/CreateGroup'

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
      <Stack
        direction='row'
        sx={{ width: '100%' }}
      >
        {/* Left */}
        <Box
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            width: 320,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack
            p={3}
            spacing={2}
            sx={{ maxHeight: '100vh' }}
          >
            <Stack
              alignItems='center'
              justifyContent='space-between'
              direction='row'
            >
              <Typography variant='h5'> Groups </Typography>
            </Stack>

            <Stack sx={{ width: '100%' }}>
              <Search>
                <SearchIconWrapper>
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
                <Plus style={{ color: (theme) => theme.palette.primary.main }} />
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
