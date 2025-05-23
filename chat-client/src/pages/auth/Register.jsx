import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import RegisterForm from '~/sections/auth/RegisterForm'
import AuthSocial from '~/sections/auth/AuthSocial'

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ m: 5, position: 'relative' }} >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#1A73E8',
            textAlign: 'center',
            mb: 3
          }}
        >
        Get Started With Zenya
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
          Already have an account?
          </Typography>
          <Link
            to="/auth/login"
            component={RouterLink}
            variant="subtitle2"
            sx={{
              textDecoration: 'none',
              fontWeight: 700,
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline', color: 'primary.dark' }
            }}
          >
           Sign in
          </Link>
        </Stack>
        {/* Register Form */}
        <RegisterForm />

        <Typography
          component='div'
          sx={{
            color: 'text.secondary',
            mt: 3,
            typography: 'caption',
            textAlign: 'center'
          }}
        >
          {'By signing up, I agree to '}
          <Link underline='always' color='text.primary'>
            Terms of Service
          </Link>
          {' and '}
          <Link underline='always' color='text.primary'>
            Privacy Policy
          </Link>
        </Typography>

        <AuthSocial />

      </Stack>
    </>
  )
}

export default Register
