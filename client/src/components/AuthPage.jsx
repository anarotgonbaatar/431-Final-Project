import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function AuthPage() {
	const navigate = useNavigate()
	const [ isLogin, setIsLogin ] = useState( true )

	const [ formData, setFormData ] = useState( {
		username: "",
		password: "",
		email: "",
		firstName: "",
		lastName: "",
		birthday: "",
		biography: "",
		favNumber: "",
		profilePic: "",
	})

	const [ error, setError ] = useState("")

	// Handle input changes
	const handleChange = (e) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	}

	const handlePicUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			setFormData(prev => ({ ...prev, profilePic: file }))
		}
	}
	
	const handleSubmit = async ( e ) => {
		e.preventDefault()
		setError( "" )

		try {
			if ( isLogin ) {
				await api.post( "/login", {
					username: formData.username,
					password: formData.password,
				} )
			} else {
				// Register
				const regData = new FormData()
				regData.append( "username", formData.username )
				regData.append( "password", formData.password )
				regData.append( "email", formData.email )
				regData.append( "firstName", formData.firstName )
				regData.append( "lastName", formData.lastName )
				regData.append( "birthday", formData.birthday )
				regData.append( "biography", formData.biography )
				regData.append( "favNumber", formData.favNumber )
				if ( formData.profilePic ) {
					regData.append( "profilePic", formData.profilePic )
				}

				await api.post( "/register", regData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
			}
			navigate( "/profile" )
		} catch ( err ) {
			console.error( err )
			setError( err.response?.data?.message || "An error occurred. Please try again." )
		}
	}

	return (
		<div className="content">

			<h1>{ isLogin ? "Login" : "Register" }</h1>

			{ error && <p className="error">{ error }</p> }

			<form className="form" onSubmit={ handleSubmit }>
				<input 
					type="text" 
					name="username" 
					value={ formData.username } 
					onChange={ handleChange } 
					placeholder="Username" 
					required 
				/>
				<input 
					type="password" 
					name="password" 
					value={ formData.password } 
					onChange={ handleChange } 
					placeholder="Password" 
					required 
				/>

				{ !isLogin && (
					<div className="form">
						<input 
							type="email" 
							name="email" 
							value={ formData.email } 
							onChange={ handleChange } 
							placeholder="Email" 
							required 
						/>
						<input 
							type="text" 
							name="firstName" 
							value={ formData.firstName } 
							onChange={ handleChange } 
							placeholder="First name" 
							required 
						/>
						<input 
							type="text" 
							name="lastName" 
							value={ formData.lastName } 
							onChange={ handleChange } 
							placeholder="Last name" 
							required 
						/>
						<input 
							type="date" 
							name="birthday" 
							value={ formData.birthday } 
							onChange={ handleChange } 
							placeholder="Birthday" 
							required 
						/>
						<input 
							type="text" 
							name="biography" 
							value={ formData.biography } 
							onChange={ handleChange } 
							placeholder="Biography" 
							required 
						/>
						<input 
							type="number" 
							name="favNumber" 
							value={ formData.favNumber } 
							onChange={ handleChange } 
							placeholder="Favorite number" 
							required 
						/>
						<input 
							type="file" 
							name="profilePic" 
							accept=".jpg"
							onChange={ handlePicUpload } 
						/>
					</div>
				)}

				<button type="submit">{ isLogin ? "Login" : "Register" }</button>
			</form>

			<p id="switch" onClick={ () => setIsLogin( !isLogin ) }>
				{ isLogin ? "Don't have an account? Register here." : "Already have an account? Login here." }
			</p>

			<p id="note">CPSC 431: Final Project by Anar Otgonbaatar</p>

		</div>
	)
}

export default AuthPage