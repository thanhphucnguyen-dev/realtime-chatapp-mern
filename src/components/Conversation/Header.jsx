import { Stack, Box, Avatar, Typography, IconButton, Divider } from '@mui/material'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { faker } from '@faker-js/faker'
import StyledBadge from '../StyledBadge'

const Header = () => {
  const theme = useTheme()
  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
      }}
    >
      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'space-between'}
        sx={{ height: '100%', width: '100%' }}
      >
        <Stack
          direction={'row'}
          spacing={2}
        >
          <Box>
            <StyledBadge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              variant='dot'
            >
              <Avatar
                src={faker.image.avatar()}
                alt={faker.person.fullName()}
              />
            </StyledBadge>

          </Box>
          <Stack spacing={0.2}>
            <Typography variant='subtitle2'> {faker.person.fullName()} </Typography>
            <Typography variant='caption'>Online</Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation='vertical' flexItem />
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>

      </Stack>
    </Box>
  )
}

export default Header
