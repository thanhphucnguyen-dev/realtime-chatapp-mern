import { Box, Stack } from '@mui/material'
import { Fragment } from 'react'
import { Chat_History } from '../../data'
import {
  MediaMsg,
  TextMsg,
  TimeLine,
  ReplyMsg,
  LinkMsg,
  DocMsg
} from './MsgTypes'

const Message = ({ menu }) => {
  const renderMessage = (el, index) => {
    if (el.type === 'divider') {
      return <TimeLine key={index} el={el} />
    }

    if (el.type === 'msg') {
      const props = { el, menu }
      switch (el.subtype) {
      case 'img':
        // img msg
        return <MediaMsg key={index} {...props} />
      case 'doc':
        // doc msg
        return <DocMsg key={index} {...props} />
      case 'link':
        // Link msg
        return <LinkMsg key={index} {...props} />
      case 'reply':
        // reply msg
        return <ReplyMsg key={index} {...props} />
      default:
        // text msg
        return <TextMsg key={index} {...props} />
      }
    }

    return <Fragment key={index} />
  }

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el, index) => renderMessage(el, index))}
      </Stack>
    </Box>
  )
}

export default Message

