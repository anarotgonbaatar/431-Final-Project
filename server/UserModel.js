const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		// Must be hashed before saving to the database
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	biography: { type: String, default: '' },
	favNumber: { type: Number },
	profilePic: { type: String, default: '' }	// Path string to the uploaded .jpg image
})

module.exports = mongoose.model( 'User', userSchema )