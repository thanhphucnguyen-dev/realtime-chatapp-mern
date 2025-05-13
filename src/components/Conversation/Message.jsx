import { Stack, Box } from '@mui/material'
import { Fragment } from 'react'
import { Chat_History } from '../../data'
import { MediaMsg, TextMsg, TimeLine, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes'

const Message = () => {
  return (
    <Box p={3} >
      <Stack spacing={3}>
        {Chat_History.map((el, index) => {
          const key = index

          switch (el.type) {
          case 'divider':
            return <TimeLine key={key} el={el} />

          case 'msg':
            switch (el.subtype) {
            case 'img':
              return <MediaMsg key={key} el={el} />
            case 'doc':
              return <DocMsg key={key} el={el} />
            case 'link':
              return <LinkMsg key={key} el={el} />
            case 'reply':
              return <ReplyMsg key={key} el={el} />
            default:
              return <TextMsg key={key} el={el} />
            }

          default:
            return <Fragment key={key} />
          }
        })}
      </Stack>

    </Box>
  )
}

export default Message
