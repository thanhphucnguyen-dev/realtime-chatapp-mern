// React & Hooks
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// MUI Components
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X
} from 'phosphor-react'

// Libraries
import { faker } from '@faker-js/faker'

// Components
import AntSwitch from './AntSwitch'

// Redux Actions
import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/app'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const BlockDialog = ({ open, handleClose }) => {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

const DeleteDialog = ({ open, handleClose }) => {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

const Contact = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [openBlock, setOpenBlock] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const handleCloseBlock = () => {
    setOpenBlock(false)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

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
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={3}
            sx={{
              height: '100%',
              p: 1
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                fontSize: '1.2rem',
                letterSpacing: 1.5,
                background: 'linear-gradient(to right, #4facfe, #00f2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Contact Info
            </Typography>
            <IconButton onClick={() => {
              dispatch(ToggleSidebar())
            }}>
              <X />
            </IconButton>
          </Stack>
        </Box>

        {/* Body */}
        <Stack
          p={3}
          spacing={3}
          sx={{
            height: '100%',
            position: 'relative',
            flexGrow: 1,
            overflowY: 'scroll'
          }}
        >
          <Stack alignItems='center' direction='row' spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.person.fullName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>
                { faker.person.fullName() }
              </Typography>
              <Typography variant='body2' fontWeight={500}>
                { '+91 729 2829 2992' }
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-evenly'
          >
            <Stack
              spacing={1}
              alignItems='center'
            >
              <IconButton><Phone /></IconButton>
              <Typography variant='overline'> Voice </Typography>
            </Stack>

            <Stack
              spacing={1}
              alignItems='center'
            >
              <IconButton><VideoCamera /></IconButton>
              <Typography variant='overline'> Video </Typography>
            </Stack>
          </Stack>

          <Divider />
          <Stack spacing={0.5}>
            <Typography variant='article' > About </Typography>
            <Typography variant='body2'>Imagination is the only limit </Typography>
          </Stack>
          <Divider />

          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography >Media, Links & Docs </Typography>
            <Button
              onClick={() => { dispatch(UpdateSidebarType('SHARED')) }}
              endIcon={ <CaretRight />}>
              401
            </Button>
          </Stack>

          <Stack direction='row' spacing={2} alignItems='center'>
            {[1, 2, 3].map((el, index) => (
              <Box key={index}>
                <img
                  src={faker.image.urlLoremFlickr({ category: 'cat' })}
                  alt={faker.person.fullName()}
                  style={{ width: 100, height: 100 }}
                />
              </Box>
            ))}
          </Stack>
          <Divider />

          <Stack direction='row' alignItems='center' justifyContent='space-between' >
            <Stack direction='row' alignItems='center' spacing={2}>
              <Star size={21} />
              <Typography variant='subtitle2'> Started Messages </Typography>
            </Stack>
            <IconButton
              onClick={() => { dispatch(UpdateSidebarType('STARRED')) }}
            >
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />

          <Stack direction='row' alignItems='center' justifyContent='space-between' >
            <Stack direction='row' alignItems='center' spacing={2}>
              <Bell size={21} />
              <Typography variant='subtitle2'> Mute Notification </Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />

          <Typography>1 group in common </Typography>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} sx={{ height: 64, width: 64 }} />
            <Stack spacing={0.5}>
              <Typography variant='subtitle2'>Coding Monk</Typography>
              <Typography variant='caption'>Own, Parrot, Rabbit, You</Typography>
            </Stack>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={2}>
            <Button
              onClick={() => { setOpenBlock(true)}}
              startIcon={<Prohibit />}
              fullWidth
              variant='outlined'
            >
              Block
            </Button>
            <Button
              onClick={() => { setOpenDelete(true)}}
              startIcon={<Trash />}
              fullWidth
              variant='outlined'
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (<BlockDialog open={openBlock} handleClose={handleCloseBlock} />)}
      {openDelete && (<DeleteDialog open={openDelete} handleClose={handleCloseDelete} />)}
    </Box>
  )
}

export default Contact
