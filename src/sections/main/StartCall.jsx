import React from 'react'
import {
  Button,
  Box,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Divider,
  IconButton
} from '@mui/material'

import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '../../components/Search'
import { CallElement } from '../../components/CallElement'
import { MagnifyingGlass } from 'phosphor-react'
import { CallLogs } from '../../data'

// Slide transition component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
          textAlign: 'center'
        }}
      >
      Start Call
      </DialogTitle>


      {/* Content */}
      <Divider />
      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={3} sx={{ mb: 5, width: '100%' }}>
          <Stack sx={{ width: '100%' }}>
            <Search
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.paper,
                borderRadius: 2,
                px: 2,
                py: 1,
                boxShadow: 1,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? '#eee' : theme.palette.background.default
                }
              }}
            >
              <SearchIconWrapper sx={{ mr: 1 }}>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                  flex: 1,
                  fontSize: '1rem',
                  color: 'inherit'
                }}
              />
            </Search>
          </Stack>
        </Stack>

        {/* Call List */}
        { CallLogs.map((el) => <CallElement key={el.id} {...el} />) }
      </DialogContent>
    </Dialog>
  )
}

export default StartCall
