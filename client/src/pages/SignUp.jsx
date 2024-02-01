import React from 'react'
import {Link} from "react-router-dom"

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-3 font-semibold'>Sign Up </h1>
      <form className='flex flex-col gap-4'>
        <input type="text" className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Username'/>
        <input type="text" className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Email'/>
        <input type="text" className='bg-slate-100 p-3 rounded-lg' placeholder='Enter Password'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>signup</button>
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
