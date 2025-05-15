// Looks for JWT token in cookies and verifies it and attaches it to the user
const jwt = require( 'jsonwebtoken' )
const User = require( './UserModel' )

const authMiddleware = async ( req, res, next ) => {
	try {
		const token = req.cookies.token

		if ( !token ) {
			return res.status( 401 ).json({ message: 'Auth denied: No token.' })
		}

		// Verify token
		const verified = jwt.verify( token, process.env.JWT_SECRET )
		if ( !verified ) {
			return res.status( 401 ).json({ message: 'Auth denied: Invalid token.' })
		}

		// Find user by ID
		req.user = await User.findById( verified.id ).select( '-password' )
		if ( !req.user ) {
			return res.status( 401 ).json({ message: 'Auth denied: User not found.' })
		}

		next()
	} catch ( error ) {
		console.error( error )
		res.status( 500 ).json({ message: 'Server error. Please try again later.' })
	}
}

module.exports = authMiddleware