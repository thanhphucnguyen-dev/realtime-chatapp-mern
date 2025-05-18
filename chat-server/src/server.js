/* eslint-disable no-console */
import http from 'http'
import exitHook from 'async-exit-hook'
import app from '~/app'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})

//------------------------------------------------------------------------------


// -----------------------------------------------------------------------------


let server = null
const START_SERVER = () => {
  const HOSTNAME = process.env.APP_HOST
  const PORT = process.env.APP_PORT

  server = http.createServer(app)

  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`)
  })

  exitHook(() => {
    console.log('4. Closing MongoDB connection...')
    CLOSE_DB()
    console.log('5. MongoDB connection closed.')
  })
}

// Connect DB  and start server
(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    const connect = await CONNECT_DB()
    console.log('2. Connected to MongoDB.')
    START_SERVER()
  } catch (error) {
    console.error('2.1 Failed to connect DB:', error)
    process.exit(1)
  }
})()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  if (server) {
    server.close(() => process.exit(1))
  } else {
    process.exit(1)
  }
})
