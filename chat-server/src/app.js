import express from 'express' // web framework for Node.js

import morgan from 'morgan' // HTTP request logger middleware for node.js

import rateLimit from 'express-rate-limit' // rate limiter middleware

import helmet from 'helmet' // secure your Express apps with various HTTP headers middleware

import mongoSanitize from 'express-mongo-sanitize' // middleware to sanitize request input

import bodyParser from 'body-parser' // body parser middleware

import xss from 'xss-clean' // Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.

import cors from 'cors' // enable CORS

import cookieParser from 'cookie-parser' // cookie parser middleware

import mongoose from 'mongoose' // MongoDB object modeling tool

import dotenv from 'dotenv' // dotenv configuration

dotenv.config() // configure dotenv at the beginning of the project

// -----------------------------------------------------------------------------

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(mongoSanitize())

app.use(xss())

app.use(cors({
  origin: '*',
  methods: ['GET', 'PATCH', 'POST', 'DELETE', 'PUT'],
  credentials: true
}))

app.use(express.json({ limit: '10kb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: 'Too many requests from this IP, Please try again in an hour'
})

app.use('/zenya', limiter)


export default app
