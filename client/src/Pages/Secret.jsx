import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


function Secret() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          localStorage.removeItem('token')
          removeCookie("jwt");
          navigate("/login");
        } 
        // else {
          
        //   toast(`Hi ${data.name} `, {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     });
        // }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    localStorage.removeItem('token')
    removeCookie("jwt");
    navigate("/login"); 
  }
  return (
    <>
    <div className='private'>
      <h1>User Home</h1>
      <button onClick={logOut}>Log Out</button>
      <ToastContainer />
    </div>
    </>
  )
}

export default Secret