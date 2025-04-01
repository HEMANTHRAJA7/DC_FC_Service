import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email,isEmail] = useState('')
    const [password,isPassword] = useState('')
    const {login,error,loading} = useLogin()
  

    const handleSubmit = async (e) =>{
        e.preventDefault() //Prevents refresh of page when form is submitted
        login(email, password)
    }

   

    return(
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input type="email" onChange={(e) => isEmail(e.target.value)} value={email}/>
            <label>Password:</label>
            <input type="password" onChange={(e) => isPassword(e.target.value)} value={password}/>
            <button disabled={loading}>Login</button>
            {error && <div>{ error }</div>}
        </form>
    )
}

export default Login