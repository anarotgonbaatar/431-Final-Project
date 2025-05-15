const express = require('express')
const User = require('../UserModel')
const multer = require('multer')
const path = require('path')
const authMiddleware = require('../authMiddleware')
const bcrypt = require('bcrypt')

const router = express.Router()

// Multer setup for jpg uploads
const storage = multer.diskStorage({
	destination: ( req, file, cb ) => {
		cb( null, 'uploads/' )
	},
	filename: ( req, file, cb ) => {
		const uniqueName = `${ Date.now() }.jpg`
		cb( null, uniqueName )
	}
})

// Only accept jpgs
const fileFilter = ( req, file, cb ) => {
	const ext = path.extname( file.originalname ).toLowerCase()
	if ( ext !== '.jpg' ) {
		// Display error message in the frontend
		return cb( new Error( 'Only .jpg files are allowed.' ), false )
	}
	cb( null, true )
}

const upload = multer({ storage, fileFilter })

// Get logged in user's profile
router.get('/profile', authMiddleware, async ( req, res ) => {
	try {
		const user = req.user
		res.json( user )
	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

// Update logged in user's profile
router.put('/profile', authMiddleware, upload.single('profilePic'), async ( req, res ) => {
	try {
		const { username, newPassword, firstName, lastName, email, biography, favNumber, profilePic } = req.body
		const user = req.user

		if ( username && username !== user.username ) {
			const existingUser = await User.findOne({ username })
			if ( existingUser ) {
				// Display error message in the frontend
				return res.status( 400 ).json({ message: 'Username already exists.' })
			}
			user.username = username
		}
		if ( newPassword ) {
			const salt = await bcrypt.genSalt( 10 )
			user.password = await bcrypt.hash( newPassword, salt )
		}
		user.firstName = firstName || user.firstName
		user.lastName = lastName || user.lastName
		user.email = email || user.email
		user.birthday = req.body.birthday || user.birthday
		user.biography = biography || user.biography
		user.favNumber = favNumber || user.favNumber
		if ( req.file ) {
			user.profilePic = `/uploads/${ req.file.filename }`
		}
		
		await user.save()

		// Display success message in the frontend
		res.json({ message: 'Profile updated successfully.' })
	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

// Upload profile picture
router.post('/profile/picture', authMiddleware, upload.single('profilePic'), async ( req, res ) => {
	try {
		const user = req.user
		if ( !req.file ) {
			return res.status( 400 ).json({ message: 'No file uploaded.' })
		}
		user.profilePic = `/uploads/${ req.file.filename }`
		await user.save()

		// Display success message in the frontend
		res.json({ message: 'Profile picture uploaded successfully.', path: user.profilePic })
	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

router.delete('/profile', authMiddleware, async ( req, res ) => {
	try {
		const user = req.user
		await User.findByIdAndDelete( user._id )
		res.clearCookie( 'token' )
		res.json({ message: 'User deleted successfully.' })
	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
})

module.exports = router