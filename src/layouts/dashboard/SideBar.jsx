import { useState } from 'react'
import { Box, IconButton, Divider, Avatar, Stack, Menu, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Gear } from 'phosphor-react'

import { Profile_Menu } from '../../data'
import AntSwitch from '../../components/AntSwitch'
import { Nav_Buttons } from '../../data'
import useSettings from '../../hooks/useSettings'
import { faker } from '@faker-js/faker'
import Logo from '../../assets/images/logo.ico'

const SideBar = () => {

  const [selected, setSelected] = useState(0)
  const theme = useTheme()
  // console.log(theme)
  const { onToggleMode } = useSettings()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        height: '100vh',
        width: 100
      }}
    >
      <Stack direction='column' alignItems={'center'} justifyContent='space-between' sx={{ height: '100%' }} spacing={3}>
        <Stack alignItems='center' spacing={4}>
          <Box
            p={2}
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5
            }}
          >
            <img src={Logo} alt={'Chat App Logo'} style={{ width: '100%', height: '100%' }} />
          </Box>

          <Stack sx={{ width: 'max-content' }} direction='column' alignItems='center' spacing={3} >
            {Nav_Buttons.map((el) => (
              el.index === selected
                ? (
                  <Box key={el.index} p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <IconButton sx={{ width: 'max-content', color: '#fff' }} key={el.index}> {el.icon} </IconButton>
                  </Box>
                )
                :(
                  <IconButton
                    onClick={() => setSelected(el.index)}
                    sx={{ width: 'max-content', color: theme.palette.mode === 'light' ? '#000' : theme.palette.text.primary }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                )
            ))}
            <Divider sx={{ width: '48px' }} />
            { selected === 3
              ? (
                <Box p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton>
                    <Gear />
                  </IconButton>
                </Box>
              )
              : (
                <IconButton
                  onClick={() => setSelected(3)}
                  sx={{ width: 'max-content', color: theme.palette.mode === 'light' ? '#000' : theme.palette.text.primary }}
                >
                  <Gear />
                </IconButton>
              )
            }
          </Stack>
        </Stack>

        <Stack spacing={4} >
          {/* Switch */}
          <AntSwitch
            onClick={() => { onToggleMode() }}
            checked={theme.palette.mode === 'light'}
          />
          {/* <Avatar src={faker.image.avatar()}/> */}
          <Avatar
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            src={faker.image.url({ width: 200, height: 200 })}/>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem key={idx} onClick={handleClose} >
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ width: 100 }}
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>

        </Stack>

      </Stack>
    </Box>
  )
}

export default SideBar
