import { IconButton, Stack, Typography, Box } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import ProfileForm from '../../sections/settings/ProfileForm'

const Profile = () => {
  return (
    <>
      <Stack direction='row' sx={{ width: '100%' }} >
        <Box
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            width: 320,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-evenly'
              sx={{ px: 2 }}
            >
              <IconButton>
                <CaretLeft size={24} color='#4B4B4B' />
              </IconButton>
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
                Profile
              </Typography>
            </Stack>

            {/* Profile Form */}
            <ProfileForm />

          </Stack>
        </Box>
      </Stack>
    </>
  )
}

export default Profile
