// Handles login, registration, and logout
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../UserModel')
const multer = require('multer')
const path = require('path')

const router = express.Router()

// Multer setup
const storage = multer.diskStorage({
	destination: ( req, file, cb ) => {
		cb( null, 'uploads' )
	},
	filename: ( req, file, cb ) => {
		const uniqueName = `${ Date.now() }.jpg`
		cb( null, uniqueName )
	},
})

const fileFilter = ( req, file, cb ) => {
	const ext = path.extname( file.originalname ).toLowerCase()
	if ( ext !== '.jpg' ) {
		return cb( new Error( 'Only .jpg files are allowed.' ), false )
	}
	cb( null, true )
}

const upload = multer({ storage, fileFilter })

// Create a JWT token
function createToken( userID ) {
	return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
		expiresIn: '7d',	// Token lasts a week
	})
}

// Register route
router.post('/register', upload.single('profilePic'), async ( req, res ) => {
	try {
		const { username, password, email, firstName, lastName, birthday, biography, favNumber } = req.body

		// Validate required inputs
		if ( !username || !password || !email || !firstName || !lastName || !birthday || !biography || !favNumber ) {
			// Display error message in the frontend
			return res.status( 400 ).json({ message: 'Please fill in all required fields.' })
		}

		// Check if user already exists
		const existingUser = await User.findOne({ username })
		if ( existingUser ) {
			// Display error message in the frontend
			return res.status( 400 ).json({ message: 'Username already exists.' })
		}

		// Hash password
		const salt = await bcrypt.genSalt( 10 )
		const hashedPassword = await bcrypt.hash( password, salt )

		// Create new user
		const newUser = new User({
			username,
			password: hashedPassword,
			email,
			firstName,
			lastName,
			birthday,
			biography,
			favNumber,
			profilePic: req.file ? `/uploads/${ req.file.filename }` : '',	// Save the file path in the database
		})

		await newUser.save()
		res.status( 201 ).json({ message: 'User registered successfully.' })

	} catch ( error ) {
		// Display error message in the frontend
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

router.post('/login', async ( req, res ) => {
	try {
		const { username, password } = req.body

		// Validate required inputs
		if ( !username || !password ) {
			// Display error message in the frontend
			return res.status( 400 ).json({ message: 'Please fill in all required fields.' })
		}

		// Check if user exists
		const user = await User.findOne({ username })
		if ( !user ) {
			// Display error message in the frontend
			return res.status( 400 ).json({ message: 'Invalid username or password.' })
		}

		// Check password
		const isMatch = await bcrypt.compare( password, user.password )
		if ( !isMatch ) {
			// Display error message in the frontend
			return res.status( 400 ).json({ message: 'Invalid username or password.' })
		}

		// Create token
		const token = createToken( user._id )
		res.cookie( 'token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'Lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,	// 7 days
		})
		res.status( 200 ).json({ message: 'Login successful.', token })

	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

router.post('/logout', ( req, res ) => {
	try {
		res.clearCookie( 'token' )
		res.status( 200 ).json({ message: 'Logout successful.' })
	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

module.exports = router