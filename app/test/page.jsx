"use client"

import axios from 'axios';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

export default function Page() {

  // let navigate = useNavigate();
  // const [errorMessage , serErrorMessage] = useState('')
  const [user , setUser] = useState({
    'name':'',
    'email':'',
    'password':'',
    'rePassword':'', 
    'phone':''
  })

  let formSubmitData =async(e)=>{
    e.preventDefault();
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", user);
    
    if(data.message == 'success'){
      alert(data.message)
      // goToLogin()
    }
    else{
      // serErrorMessage(data.message)
      alert(data.message)

    }  
  }

  // let goToLogin=()=>{
  //   navigate('/login')
  // }
  let getInputData=(e)=>{
    let myUser = {...user} //Deep copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }
  return (
    <div className='my-3 p-5 '>
      <h1>Registeration Form</h1>
      {/* {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:""} */}
      <form onSubmit={formSubmitData}>
        <div className='inputData '>
          <label htmlFor='name'> Name</label>
          <input onChange={getInputData} type="text" name="name" id="name" className='form-control my-2' />
        </div>
        <div className='inputData'>
          <label htmlFor='email'>Email</label>
          <input onChange={getInputData} type="text" name="email" id="email" className='form-control my-2' />
        </div>
        <div className='inputData'>
          <label htmlFor='password'>Password</label>
          <input onChange={getInputData} type="password" name="password" id="password" className='form-control my-2' />
        </div>
        <div className='inputData'>
          <label htmlFor='rePassword'>Re-Password</label>
          <input onChange={getInputData} type="password" name="rePassword" id="rePassword" className='form-control my-2' />
        </div>
        <div className='inputData'>
          <label htmlFor='phone'>Phone</label>
          <input onChange={getInputData} type="number" name="phone" id="phone" className='form-control my-2' />
        </div>
        <button className='btn btn-info float-end my-3'>Register</button>
        <div className='clear-fix'></div>

      </form>
    </div>
  )
}
