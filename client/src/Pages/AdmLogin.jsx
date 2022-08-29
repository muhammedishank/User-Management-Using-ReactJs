import { useNavigate } from 'react-router-dom'
import React, { useState ,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

function AdmLogin() {
    const navigate = useNavigate()
    const [values, setvalues] = useState({ email: "", password: "" })
    const generateError = (err) => toast.error(err, { position: "bottom-right" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(values);
        try {
            const { data } = await axios.post("http://localhost:5000/AdmLogin", { ...values }, { withCredentials: true })
            console.log("ADMINN DARTA",data);
            if (data) {
                localStorage.setItem('adminToken',data.token)
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/AdminHome")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('adminToken')  
        if(token) {
           navigate('/AdminHome')
        }
      }, [])

    return (
        <div className='container'>
            <h2>Admin Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
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
            </form>
            <ToastContainer />
        </div>
    )
}

export default AdmLogin