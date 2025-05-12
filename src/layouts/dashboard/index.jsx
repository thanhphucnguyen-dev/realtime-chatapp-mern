import { useState } from 'react'
import { useTheme, styled } from '@mui/material/styles'
import { Gear } from 'phosphor-react'
import { Outlet } from 'react-router-dom'
import { Box, IconButton, Divider, Avatar, Switch } from '@mui/material'
import Stack from '@mui/material/Stack'
import { faker } from '@faker-js/faker'


import Logo from '../../assets/images/logo.ico'
import { Nav_Buttons } from '../../data'

import useSettings from '../../hooks/useSettings'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff' // Sử dụng theme.palette.mode để kiểm tra chế độ
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)', // Thay đổi màu track theo chế độ sáng/tối
    boxSizing: 'border-box'
  }
}))


const DashboardLayout = () => {

  const [selected, setSelected] = useState(0)
  const theme = useTheme()
  // console.log(theme)
  const { onToggleMode } = useSettings()

  return (
    <div>
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
            <Avatar src={faker.image.url({ width: 200, height: 200 })}/>
          </Stack>

        </Stack>
      </Box>

      <Outlet />
    </div>
  )
}

export default DashboardLayout
