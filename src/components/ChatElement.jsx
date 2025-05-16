import { Box, Stack, Typography, Avatar, Badge } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { faker } from '@faker-js/faker'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))


const ChatElement = ( { id, name, img, msg, time, unread, online }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
      }}
      p={1}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack direction='row' spacing={2}>
          { online
            ? (
              <StyledBadge
                overlap='circular'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                variant='dot'
              >
                <Avatar src={faker.image.avatar()} sx={{ width: 40, height: 40 }} />
              </StyledBadge>
            )
            : (
              <Avatar src={faker.image.avatar()} sx={{ width: 40, height: 40 }} />
            )
          }

          <Stack spacing={0.4}>
            <Typography variant='subtitle2'> {name} </Typography>
            <Typography variant='caption'> {msg} </Typography>
          </Stack>
        </Stack>

        <Stack spacing={1.5} alignItems='center'>
          <Typography sx={{ fontWeight: 600 }} variant='caption'> {time} </Typography>
          <Badge
            color='primary'
            badgeContent={unread}
            sx={{
              '& .MuiBadge-badge': {
                minWidth: 20,
                height: 20,
                borderRadius: '50%',
                fontSize: '0.75rem'
              }
            }}
          > </Badge>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ChatElement
