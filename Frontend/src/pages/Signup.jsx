import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email,isEmail] = useState('')
    const [password,isPassword] = useState('')
    const [username,isUsername] = useState('')
    const {signup,error,loading} = useSignup()
    

    const handleSubmit = async (e) =>{
        e.preventDefault() //Prevents refresh of page when form is submitted
        await signup(email,password,username)
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>Email:</label>
            <input type="email" onChange={(e) => isEmail(e.target.value)} value={email}/>
            <label>Password:</label>
            <input type="password" onChange={(e) => isPassword(e.target.value)} value={password}/>
            <label>Username:</label>
            <input type="text" onChange={(e) => isUsername(e.target.value)} value={username}/>
            <button disabled={loading}>Signup</button>
            
            {error && <div>{error}</div>}
        </form>
    )
}

export default Signup