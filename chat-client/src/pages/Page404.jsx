import { Box, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'light' ? '#F4F6F8' : theme.palette.background.default,
        textAlign: 'center',
        px: 3
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '6rem' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ textTransform: 'none', px: 4, py: 1 }}
      >
        Go Home
      </Button>
    </Box>
  )
}

export default Page404
