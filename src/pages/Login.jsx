import React from 'react'
import LoginCard from "../components/shared/LoginCard"

function Login() {
  return (
    <div className='py-[72px] bg-[#121212] text-[#fafafa] bricolage'>
          <div className=''>
          <h1 className='text-center text-4xl mb-2 font-semibold'>Login now</h1>
          <p className='text-sm text-opacity-45 text-center mx-auto text-[#3dcd8c]'>Explore Top notch courses provided by <span className='italic font-semibold'>@MicroDeft</span></p>
          <LoginCard/>
          </div>
         </div>
  )
}

export default Login