import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
import NewPasswordForm from '~/sections/auth/NewPasswordForm'

const NewPassword = () => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          m: 5,
          position: 'relative'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1A73E8',
            textAlign: 'center',
            mb: 3
          }}
        >
        Reset Password?
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
            Please set your new password
          </Typography>
        </Stack>

        {/* New Password Form */}
        <NewPasswordForm />

        <Link
          component={RouterLink}
          to='/auth/login'
          color='inherit'
          variant='subtitle2'
          sx={{
            mt: 3,
            mx: 'auto',
            alignItems: 'center',
            display: 'inline-flex'
          }}
        >
          <CaretLeft />
          Return to sign in
        </Link>

      </Stack>
    </>
  )
}

export default NewPassword
