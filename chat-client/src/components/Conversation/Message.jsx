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
      const props = { key: index, el, menu }
      switch (el.subtype) {
      case 'img':
        // img msg
        return <MediaMsg {...props} />
      case 'doc':
        // doc msg
        return <DocMsg {...props} />
      case 'link':
        // Link msg
        return <LinkMsg {...props} />
      case 'reply':
        // reply msg
        return <ReplyMsg {...props} />
      default:
        // text msg
        return <TextMsg {...props} />
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

// const Message = ({ menu }) => {
//   return (
//     <Box p={3} >
//       <Stack spacing={3}>
//         {Chat_History.map((el, index) => {
//           const key = index

//           switch (el.type) {
//           case 'divider':
//             return <TimeLine key={key} el={el} />

//           case 'msg':
//             switch (el.subtype) {
//             case 'img':
//               // img msg
//               return <MediaMsg key={key} el={el} menu={menu} />
//             case 'doc':
//               // doc msg
//               return <DocMsg key={key} el={el} menu={menu} />
//             case 'link':
//               // Link msg
//               return <LinkMsg key={key} el={el} menu={menu} />
//             case 'reply':
//               // reply msg
//               return <ReplyMsg key={key} el={el} menu={menu} />
//             default:
//               // text msg
//               return <TextMsg key={key} el={el} menu={menu} />
//             }

//           default:
//             return <Fragment key={key} />
//           }
//         })}
//       </Stack>

//     </Box>
//   )
// }
