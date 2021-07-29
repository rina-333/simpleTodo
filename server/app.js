if ( process.env.NODE_ENV !== "production" ) {
  require ( 'dotenv' ).config()
}

const express = require ( 'express' )
const errorHandler = require('./middlewares/errorHandler.js')
const app = express()
const cors = require ('cors')

const PORT = process.env.PORT || 3000
const router = require ( './routes/index.js' )

app.use (cors())
app.use ( express.json() )
app.use ( express.urlencoded( { extended: true } ) )

app.use ( '/', router )
app.use ( errorHandler )

app.listen ( PORT, () => {
  console.log( `Running at http://localhost:${PORT}` )
} )