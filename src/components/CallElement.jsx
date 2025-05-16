import React from 'react'
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton
} from '@mui/material'
// import { useTheme } from '@mui/material/styles'
import {
  ArrowDownLeft,
  ArrowUpRight,
  VideoCamera,
  Phone
} from 'phosphor-react'

import { faker } from '@faker-js/faker'
import StyledBadge from './StyledBadge'

const CallLogElement = ({ incoming, missed, online }) => {
  // const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          width: '100%',
          borderRadius: 1,
          backgroundColor: (theme) => theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper
        }}
        p={2}
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
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant='dot'
                >
                  <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} sx={{ width: 40, height: 40 }} />
                </StyledBadge>
              )
              : (
                <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} sx={{ width: 40, height: 40 }} />
              )
            }
            <Stack spacing={0.4}>
              <Typography variant='subtitle2'> {faker.person.fullName()} </Typography>

              <Stack direction='row' alignItems='center' spacing={1}>
                {incoming
                  ? <ArrowDownLeft color={missed ? 'red' : 'green'} />
                  : <ArrowUpRight color={missed ? 'red' : 'green'} />}
                <Typography variant='caption'>
                  Yesterday 21:24
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <IconButton>
            <Phone color='green' />
          </IconButton>

        </Stack>

      </Box>
    </>
  )
}

const CallElement = ({ online }) => {
  return (
    <Box
      sx={{
        mb: 1,
        width: '100%',
        borderRadius: 3,
        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.paper
      }}
      p={2}
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
              >
                <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} sx={{ width: 40, height: 40 }} />
              </StyledBadge>
            )
            : (
              <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} sx={{ width: 40, height: 40 }} />
            )
          }
          <Stack spacing={0.4}>
            <Typography variant='subtitle2'> {faker.person.fullName()} </Typography>

          </Stack>
        </Stack>
        <Stack direction='row' alignItems='center'>
          <IconButton>
            <Phone color='green' />
          </IconButton>
          <IconButton>
            <VideoCamera color='green' />
          </IconButton>
        </Stack>

      </Stack>

    </Box>
  )
}

export { CallLogElement, CallElement }
