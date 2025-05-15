import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function ProfilePage() {
	const navigate = useNavigate()
	const [ user, setUser ]	= useState( null )
	const [ editMode, setEditMode ] = useState( false )
	const [ formData, setFormData ] = useState( {} )
	const [ error, setError ] = useState( "" )
	const [ newPassword, setNewPassword ] = useState( "" )

	// Get user profile when page loads
	useEffect( () => {
		const getProfile = async () => {
			try {
				const res = await api.get( "/profile" )
				setUser( res.data )
				setFormData( res.data )
			} catch ( err ) {
				console.error( err )
				navigate( "/" )
				setError( "An error occurred. Please try again." )
			}
		}
		getProfile()
	}, [ navigate ] )

	// Handle form inputs
	const handleChange = ( e ) => {
		setFormData( prev => ({ ...prev, [ e.target.name ]: e.target.value }) )
	}

	// Update profile info
	const handleUpdate = async ( e ) => {
		e.preventDefault()
		try {
			await api.put( "/profile", {
				email: formData.email,
				firstName: formData.firstName,
				lastName: formData.lastName,
				birthday: formData.birthday,
				biography: formData.biography,
				favNumber: formData.favNumber,
				profilePic: formData.profilePic,
			} )
			setEditMode( false )
			const res = await api.get( "/profile" )
			setUser( res.data )
		} catch ( err ) {
			console.error( err )
			setError( "Update failed. Please try again." )
		}
	}

	// Upload profile picture
	const handlePicUpload = async ( e ) => {
		const file = e.target.files[ 0 ]
		
		if ( file ) {
			const formData = new FormData()
			formData.append( "profilePic", file )
			
			try {
				const res = await api.post( "/profile/picture", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})

				setFormData( prev => ({ ...prev, profilePic: res.data.path }) )
				const updated = await api.get( "/profile" )
				setUser( updated.data )
			} catch ( err ) {
				console.error( err )
				setError( err.response?.data?.message || "Upload failed. Please try again." )
			}
		}
	}

	// Logout user
	const handleLogout = async () => {
		try {
			await api.post( "/logout" )
			navigate( "/" )
		} catch ( err ) {
			console.error( err )
			setError( "Logout failed. Please try again." )
		}
	}

	const handleDeleteAccount = async () => {
		if ( !window.confirm( "Are you sure you want to delete your account? This action cannot be undone." ) ) {
			return
		}
		try {
			await api.delete( "/profile" )
			navigate( "/" )
		} catch ( err ) {
			console.error( err )
			setError( "Failed to delete account. Please try again." )
		}
	}

	if ( !user ) {
		return <div>Loading...</div>
	}

	return (
		<div className="content">
			<h1>Welcome, { user.firstName }.</h1>

			{ error && <p className="error">{ error }</p> }

			{ !editMode ? (
				<div id="profile-info">
					<h2>Profile info</h2>
					
					<div style={{ display: "flex", alignItems: "center" }}>
						<img
							src={
								user.profilePic && user.profilePic.trim() !== ''
								? `http://localhost:5000${user.profilePic}`
								: `http://localhost:5000/uploads/blank.jpg`
							}
							alt="Profile"
							className="profile-pic"
						/>
						<div style={{ display: "flex", flexDirection: "column", marginLeft: "1rem", gap: "0.75rem" }}>
							<p>Username: { user.username }</p>
							<p>Email: { user.email }</p>
							<p>First Name: { user.firstName }</p>
							<p>Last Name: { user.lastName }</p>
						</div>
					</div>
					
					<p>Birthday: { new Date( user.birthday ).toLocaleDateString() }</p>
					<p>Biography: { user.biography }</p>
					<p>Favorite Number: { user.favNumber }</p>

					<button id="edit-btn" onClick={ () => setEditMode( true ) }>Edit Profile</button>
				</div>
			):(
				<form className="form" onSubmit={ handleUpdate }>
					<h2>Editing profile info</h2>
					<div>
						<input className="upload" type="file" accept=".jpg" onChange={ handlePicUpload } />
					</div>
					<input type="email" name="email" value={ formData.email } onChange={ handleChange } required />
					<input type="text" name="firstName" value={ formData.firstName } onChange={ handleChange } required />
					<input type="text" name="lastName" value={ formData.lastName } onChange={ handleChange } required />
					<input type="date" name="birthday" value={ formData.birthday?.slice( 0, 10 ) } onChange={ handleChange } required />
					<input type="text" name="biography" value={ formData.biography } onChange={ handleChange } required />
					<input type="number" name="favNumber" value={ formData.favNumber } onChange={ handleChange } required />

					<button type="submit" id="update-btn">Update Profile</button>
					<button id="cancel-btn" onClick={ () => setEditMode( false ) }>Cancel</button>
				</form>
			)}

			<button id="logout-btn" onClick={ handleLogout }>Logout</button>
			
			<div id="danger-zone">
				<h2>Danger Zone</h2>
				<button id="delete-btn" onClick={ handleDeleteAccount }>Delete Account</button>
			</div>
		</div>
	)
}

export default ProfilePage