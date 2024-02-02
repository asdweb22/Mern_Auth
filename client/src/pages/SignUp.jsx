import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

export default function SignUp() {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false)
  // const [error,setError]=useState(false)
  
  const handleChange =(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res= await axios.post("/api/auth/signup",formData)
      console.log("After submit form : ",formData)
      console.log("response from server :",res.data)
      setLoading(false)
      navigate("/sign-in")
    } catch (error) {
      setLoading(false)
      setError(true)

    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-3 font-semibold'>Sign Up </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" name='username' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Username'/>
        <input type="text" name='email' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Email'/>
        <input type="password" name='password' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Password'/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ?"Loading ...":"Signup"}</button>
      </form>
      <div className='flex gap-3 my-3'>
        <p>Have an acoount </p>
        <Link to="/sign-in">
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
