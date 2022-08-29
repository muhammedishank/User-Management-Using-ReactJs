import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()
    const [values, setvalues] = useState({
        name: "", email: "", password: ""
    })
    const generateError = (err) => toast.error(err, { position: "bottom-right" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:5000/signup", { ...values },{withCredentials:true})
            if (data) {
                if (data.errors) {
                  const {name,email,password} = data.errors;
                  if (email) generateError(email);
                  else if (password) generateError(password);
                  else if (name) generateError(name)
                } else {
                   navigate("/login")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='container'>
            <h2>Register Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' placeholder='Name' 
                       onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                    } />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Email' 
                    onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Password' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <button type='submit'>Submit</button>
                <span>
                    Already have an Account? <Link to={'/login'}>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup