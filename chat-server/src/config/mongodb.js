/* eslint-disable no-console */
import mongoose from 'mongoose'
import { env } from './environment'

let dbInstance = null
mongoose.set('strictQuery', true)

// Connect to MongoDB
export const CONNECT_DB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    dbInstance = mongoose.connection.db
    console.log('Mongoose connected to MongoDB')

  } catch (error) {
    console.log('Mongoose connection error: ', error)
    throw error
  }
}

export const GET_DB = () => {
  if (!dbInstance) {
    throw new Error('Must connect to Database first!')
  }
  return dbInstance
}

/* Close connection to database when needed */
export const CLOSE_DB = async () => {
  try {
    await mongoose.connection.close()
    console.log('Mongoose connection closed.')
  } catch (error) {
    console.error('Error closing Mongoose connection: ', error)

  }
}
