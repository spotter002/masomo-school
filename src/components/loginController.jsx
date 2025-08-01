import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const LoginComponent = () => {
     const {setToken ,setUser}=useContext(AuthContext)
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading("Logging in...")
        try {
            const data = {email,password}
            const res = await axios.post("https://schoolapi-qrlm.onrender.com/user/Auth/login",data)
            
            const{token,user}=res.data
            setToken(token)
            setUser(user)

            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            setLoading("")

            // console.log(res.data)
            if(res.data.user){
                if(res.data.user.role === 'admin'){
                    navigate('/admin-dashboard')
                }else if(res.data.user.role === 'teacher'){
                    navigate('/teacher-dashboard')
                }else if(res.data.user.role === 'parent'){
                    navigate('/parent-dashboard')
                }else{
                    navigate('/')
                }
            }
            setSuccess(res.data.message)
        } catch (error) {
            setLoading("")
            setError(error.message || "Something went wrong!")
        }
    }
  return (
    <div className='container mt-5' style={{maxWidth:'500px'}}>
        <form onSubmit={handleSubmit} className='card shadow p-4 bg-light rounded'>
            <h1 className='text-center text-success'>Masomo School</h1>
            <h2 className='text-center text-success'>Login</h2>
            
            {/* alerts */}
            {success? <div className='alert alert-success'>{success}</div> : null}
            {error? <div className='alert alert-danger'>{error}</div> : null}
            {loading? <div className='alert alert-info'>{loading}</div> : null}
            {/* inputs */}
            <input type="email" className='form-control mb-3 mt-3' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            {email}
            <input type="password" className='form-control mb-3 mt-3' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            {password}
            <div className="d-grid mb-3">
                <button type="submit" className='btn btn-success'>Login</button>
            </div>
            <div>
                <p>Dont have an account? <Link to={'/register'}>Register</Link></p>
            </div>
        
        </form>

    </div>
  )
}

export default LoginComponent