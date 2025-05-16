import { Container, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Logo from '../../assets/images/logo.ico'

const glowEffect = () => ({
  logoStyle: {
    height: 120,
    width: 120,
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    animation: 'glow 3s ease-in-out infinite'
  },
  keyframes: `
    @keyframes glow {
  0% {
    box-shadow: 0 0 10px 5px rgba(103, 100, 255, 0.5);
    transform: scale(1);
    opacity: 1;
  }
  50% {
    box-shadow: 0 0 40px 20px rgba(130, 94, 240, 0.6);
    transform: scale(1.1); /* phóng to nhẹ */
    opacity: 1;
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(103, 100, 255, 0.5);
    transform: scale(1);
    opacity: 1;
  }
}
  `
})

const MainLayout = () => {
  const { logoStyle, keyframes } = glowEffect()
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth='sm'>
        <Stack spacing={5}>
          <>
            <style>{keyframes}</style>
            <Stack sx={{ width: '100%' }} direction="column" alignItems="center">
              <img src={Logo} alt="Logo" style={logoStyle} />
            </Stack>
          </>
        </Stack>


        <Outlet />
      </Container>
    </>
  )
}

export default MainLayout
