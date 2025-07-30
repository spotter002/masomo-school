import React ,{ useState }  from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'


const RegisterComponent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secretKey, setSecretKey] = useState('')

    // user interaction
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState('')
    const navigate=useNavigate()

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading("Registering Admin account...")
        
    try {
            const data = {name,email,password,secretKey}
            const res = await axios.post("https://schoolapi-qrlm.onrender.com/user/Auth/register",data)
            // console.log("Registration",res.data)
            if(res.data.newUser){
            setLoading("")
            setSuccess(res.data.message)
            alert("Registration Successfull you will be directed to login page")
            navigate('/login')
            }
            setLoading("")
            setError(res.data.message)
        } catch (error) {
            setError(error.message)
            setLoading("")
        }
    }
  return (
    <div className='container mt-5 ' style={{maxWidth:'500px'}}>
        <form onSubmit={handleSubmit} className='card shadow bg-light p-4 rounded   '>
            <h1 className='text-center text-success'>Masomo School</h1>
            <h2 className='text-center mb-4 text-success'>Register</h2>

            {/* alerts */}
            {error?  <div className="alert alert-danger">{error}</div> : null}
            {success? <div className="alert alert-success">{success}</div> : null} 
            {loading? <div className="alert alert-info">Loading...</div> : null}
            {/* inputs */}
            <input type="text" className='form-control mb-3' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} required />
            {name}
            <input type="email" className='form-control mb-3' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
            {email}
            <input type="password" className='form-control mb-3' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {password}
            
            <input type="password" className='form-control mb-3' placeholder='Enter your secret key' value={secretKey} onChange={(e)=>setSecretKey(e.target.value)} required />
            {secretKey}
            <div className="d-grid mb-3">
                <button type="submit" className='btn btn-success'>Register</button>
            </div>
            <div className="text-center">
                <p>Already have an account? {''}
                    <Link to={'/login'} className='text-decoration-none'>Login</Link>
                </p>
            </div>
        </form>

    </div>
  )
}

export default RegisterComponent