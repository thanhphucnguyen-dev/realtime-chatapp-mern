import { Box, Stack, Typography, IconButton, Tabs, Tab, Grid } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { CaretLeft, X } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../redux/slices/app'
import { faker } from '@faker-js/faker'
import { SHARED_LINKS, SHARED_DOCS } from '../data'
import { DocMsg, LinkMsg } from './Conversation/MsgTypes'

const SharedMessages = () => {

  const theme = useTheme()
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box
      sx={{
        width: 320,
        height: '100vh'
      }}
    >
      <Stack sx={{ height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25',
            width: '100%',
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
          }}
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={3}
            sx={{
              height: '100%',
              p: 2
            }}
          >
            <IconButton onClick={() => {
              dispatch(UpdateSidebarType('CONTACT'))
            }}>
              <CaretLeft />
            </IconButton>
            <Typography variant='subtitle2'>Shared Messages</Typography>

          </Stack>
        </Box>

        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            px: 2,
            pt: 2
          }}
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

        {/* Body */}
        <Stack
          p={3}
          spacing={value === 1 ? 1 : 3}
          sx={{
            height: '100%',
            position: 'relative',
            flexGrow: 1,
            overflowY: 'scroll'
          }}
        >
          {(() => {
            switch (value) {
            case 0:
              // Images
              return (
                <Grid container spacing={2}>
                  {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => (
                      <Grid item xs={4} key={index}>
                        <img
                          src={ faker.image.avatar() }
                          alt={ faker.person.fullName()}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover'
                          }}
                        />
                      </Grid>
                    ))
                  }
                </Grid>
              )

            case 1:
              // Links
              return SHARED_LINKS.map((el, index) => <LinkMsg el={el} key={index} />)
            case 2:
              // Docs
              return SHARED_DOCS.map((el, index) => <DocMsg el={el} key={index} />)
            default:
              break
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  )
}

export default SharedMessages
