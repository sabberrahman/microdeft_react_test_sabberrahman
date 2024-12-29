import React from 'react'
import RegisterCard from '@/components/shared/RegisterCard'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='py-[72px] bg-[#121212] text-[#fafafa] bricolage'>
      <div className=''>
      <h1 className='text-center text-4xl mb-2 font-semibold'>Register Now</h1>
      <p className='text-sm text-opacity-45 text-center mx-auto text-[#3dcd8c]'>Join the thrilling Community of <span className='italic font-semibold'>@MicroDeft</span></p>
      <RegisterCard/>
      </div>
     </div>
  )
}

export default Register