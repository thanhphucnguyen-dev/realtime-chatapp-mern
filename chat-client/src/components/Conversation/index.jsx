import { Stack, Box } from '@mui/material'

import Header from './Header'
import Footer from './Footer'
import Message from './Message'

const Conversation = () => {

  return (
    <Stack height='100%' maxHeight='100vh' width='auto'>

      {/* Chat Header */}
      <Header />

      {/* Messages */}
      <Box
        sx={{
          width: '100%',
          flexGrow: 1,
          height: '100%',
          overflowY: 'scroll'
        }}
      >
        <Message menu={true} />
      </Box>

      {/* Chat Footer */}
      <Footer />

    </Stack>
  )
}

export default Conversation
