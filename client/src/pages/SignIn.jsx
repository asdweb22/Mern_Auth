import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import { signInFailure, signInStart,signInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'




export default function SignIn() {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({})
  const {loading,error}=useSelector((state)=>state.user)
  
  const handleChange =(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res= await axios.post("/api/auth/signin",formData)
      console.log(res)
      console.log("After submit form : ",formData)
      console.log("response from server :",res.data)

      if(res.data.success===false){
        console.log("Error :",res.data)
        dispatch(signInFailure(res.data.message))
        return;
      }
      dispatch(signInSuccess(res.data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error))
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-3 font-semibold'>Sign in </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" name='email' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Email'/>
        <input type="password" name='password' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Password'/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ?"Loading ...":"Sign In"}</button>
      </form>
      <div className='flex gap-3 my-3'>
        <p>Don't Have an acoount </p>
        <Link to="/sign-up">
        <span className='text-blue-500'>Sign Up</span>
        </Link>
        <p className='text-red-700'>{error ? error.message || "something went wrong":""}</p>
      </div>
    </div>
  )
}
