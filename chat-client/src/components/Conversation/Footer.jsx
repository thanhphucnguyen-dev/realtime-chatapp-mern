/* eslint-disable no-console */
// Emoji Picker - speed dial
//
import { useState } from 'react'
import { Stack, Box, IconButton, InputAdornment, TextField, Tooltip, Fab } from '@mui/material'
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User } from 'phosphor-react'
import { styled, useTheme } from '@mui/material/styles'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Actions = [
  {
    color: '#4DA5FE',
    icon: <Image size={24}/>,
    y: 102,
    title: 'Photo/Video'
  },
  {
    color: '#1B8CFE',
    icon: <Sticker size={24}/>,
    y: 172,
    title: 'Stickers'
  },
  {
    color: '#0172E4',
    icon: <Camera size={24}/>,
    y: 242,
    title: 'Image'
  },
  {
    color: '#0159B2',
    icon: <File size={24}/>,
    y: 312,
    title: 'Document'
  },
  {
    color: '#013f7f',
    icon: <User size={24}/>,
    y: 382,
    title: 'Contact'
  }
]

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px !important',
    paddingBottom: '12px !important'
  }
}))

const ChatInput = ({ setOpenPicker }) => {

  const [openActions, setOpenActions] = useState(false)

  return (
    <StyledInput
      fullWidth
      placeholder='Write a message...'
      variant='filled'
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: 'max-content' }} >
            <Stack sx={{ position: 'relative', display: openActions ? 'inline-block' : 'none' }}>
              {Actions.map((el, index) => (
                <Tooltip key={index} placement='right' title={el.title}>
                  <Fab sx={{ position:  'absolute', top: -70 * (index + 1), backgroundColor: el.color }}>
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment position='start'>
              <IconButton onClick={() => { setOpenActions((prev) => !prev) }} >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
              <Smiley />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}


const Footer = () => {
  const theme = useTheme()
  const [openPicker, setOpenPicker] = useState(false)
  return (
    <Box
      p={2}
      sx={{
        height: 100,
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
      }}
    >
      <Stack direction={'row'} spacing={3} alignItems={'center'}>
        {/* Chat Input */}
        <Stack
          sx={{
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: openPicker ? 'inline' : 'none',
              zIndex: 10,
              position: 'fixed',
              bottom: 81,
              right: 100
            }}
          >
            <Picker theme={theme.palette.mode} data={data} onEmojiSelect={ console.log } />
          </Box>
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>
        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
            cursor: 'pointer'
          }}
        >
          <Stack
            sx={{
              height: '100%',
              width: '100%'
            }}
            alignItems='center'
            justifyContent='center'
          >
            <IconButton>
              <PaperPlaneTilt color='#fff' />
            </IconButton>
          </Stack>
        </Box>

      </Stack>
    </Box>
  )

}

export default Footer
