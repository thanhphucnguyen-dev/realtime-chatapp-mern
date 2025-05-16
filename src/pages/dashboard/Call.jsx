import React, { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider
} from '@mui/material'
import { MagnifyingGlass, Phone } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'

import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '../../components/Search'
import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data'
import StartCall from '../../sections/main/StartCall'


const Call = () => {
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
              <Typography variant='h5'> Call Logs </Typography>
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
              <Typography variant='subtitle2' component={Link}> Start Conversation </Typography>
              <IconButton onClick={handleOpenDialog} >
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />

            <Stack spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  <Typography variant="subtitle2" sx={{ color: '#676667' }}>
                    Pinned
                  </Typography>
                  {/* Call Logs */}
                  {CallLogs.map((el) => <CallLogElement {...el} />)}

                </Stack>

              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        {/* TODO => Reuse Conversation Components */}
      </Stack>

      {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} /> }
    </>
  )
}

export default Call
