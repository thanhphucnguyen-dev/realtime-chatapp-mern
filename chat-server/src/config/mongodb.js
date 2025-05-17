import { env } from './environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

let chatappDatabaseInstance = null

// Create MongoDB client instance
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})


// Connect to MongoDB
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  chatappDatabaseInstance = mongoClientInstance.db(env.MONGODB_DB_NAME)
}

export const GET_DB = () => {
  if (!chatappDatabaseInstance) {
    throw new Error('Must connect to Database first!')
  }
  return chatappDatabaseInstance
}

/* Close connection to database when needed */
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
