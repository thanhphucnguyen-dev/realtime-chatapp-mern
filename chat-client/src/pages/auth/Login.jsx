import { Link as RouterLink } from 'react-router-dom'
// sections
import { Stack, Typography, Link } from '@mui/material'
import AuthSocial from '~/sections/auth/AuthSocial'
import LoginForm from '~/sections/auth/LoginForm'

// ----------------------------------------------------------------------
const LoginPage = () => {
  return (
    <>
      <Stack spacing={2} sx={{ m: 5, position: 'relative' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1A73E8',
            textAlign: 'center',
            mb: 3
          }}
        >
        Zenya Login
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
          New User?
          </Typography>
          <Link
            to="/auth/register"
            component={RouterLink}
            variant="subtitle2"
            sx={{
              textDecoration: 'none',
              fontWeight: 700,
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline', color: 'primary.dark' }
            }}
          >
          Create an account
          </Link>
        </Stack>

        {/* Login Form */}
        <LoginForm />
        {/* Auth Social */}
        <AuthSocial />
      </Stack>
    </>
  )
}

export default LoginPage
