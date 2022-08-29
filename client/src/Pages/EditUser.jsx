import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './store/Context'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

function Edit() {
    const Navigate = useNavigate()
    const generateError = (err) => toast.error(err, { position: "bottom-right" })
    const { userDetails } = useContext(AuthContext);
    const [name, setName] = useState(userDetails.name);
    const [email, setEmail] = useState(userDetails.email);
    let id = userDetails._id;
    // const [values, setvalues] = useState({ name: {name}, email: {email}  })

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:5000/editUser/${id}`, {name,email})
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    Navigate("/AdminHome")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
       
        <div className='container'>
            <h2>Edit User</h2>
            <form onSubmit={(e) => handleEdit(e)}>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text"
                        name='name'
                        onChange={(e) => setName( e.target.value)}
                        value={name}
                         />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email"
                        name='email'
                        onChange={(e) => setEmail( e.target.value )}
                        value={email}
                        />            </div>
                <button type='submit'>Submit</button>
            </form>
            <ToastContainer />

        </div>
    );
}

export default Edit;