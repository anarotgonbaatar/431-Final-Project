const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.js')
const profileRoutes = require('./routes/profile.js')

// Load env variables
dotenv.config()

// Create express app
const app = express()

// Middleware
app.use( express.json() )
app.use( cookieParser() )
app.use( '/uploads', express.static('uploads') )

// Allow CORS
app.use( cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}))

// Connect to MongoDB
mongoose.connect( process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} )
.then(() => {
	console.log('Connected to MongoDB')
})
.catch( err => {
	console.error('Error connecting to MongoDB:', err)
})

// Routes
app.use('/api', authRoutes )
app.use('/api', profileRoutes )

// Start server
const PORT = process.env.PORT || 5000
app.listen( PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})