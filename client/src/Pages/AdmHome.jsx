
import React from 'react'
import { Button } from 'react-bootstrap';
import { useState, useEffect ,useContext} from 'react'
import axios from 'axios'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from './store/Context'
import swal from 'sweetalert';

async function deleteUser(id){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then( async (willDelete)=>{
            if(willDelete){
              await axios.delete(`http://localhost:5000/deleteUser/${id}`)
            } 
        })      
}


function AdminHome() {


async function unBlockUser(id){
  await axios.put(`http://localhost:5000/unBlockUser/${id}`)
  fetchUsers();
  swal("You unblocked");
}
const fetchUsers = async () => {
  const { data } = await axios.post("http://localhost:5000/getUser")
  setUser(data)
}

  const Navigate = useNavigate()
  const {setUserDetails} = useContext(AuthContext)
  const [user, setUser] = useState([])
  
  useEffect(() => {
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    fetchUsers();
  }, [])
  async function blockUser(id){
    await axios.put(`http://localhost:5000/blockUser/${id}`)
    fetchUsers();
    swal("You Blocked");
  }
  return (
 <div>
    <h2 className='container'>User Management</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="simple table">
        <TableHead>  
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">EDIT</TableCell>
            <TableCell align="right">BLOCK</TableCell>
            <TableCell align="right">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><Button 
              onClick={()=>{setUserDetails(row)
               Navigate('/EditUser') }}>Edit</Button></TableCell>
              <TableCell align="right">{row.block?(<Button onClick={()=>unBlockUser(row._id)} >UnBlock</Button>):(<Button onClick={()=>blockUser(row._id)}>Block</Button>)}</TableCell>
              <TableCell align="right" ><Button style= {{backgroundColor: "red"}} onClick={()=>deleteUser(row._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AdminHome

