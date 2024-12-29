import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='text-center h-screen flex flex-col justify-center '>
        <h1 className='text-6xl  text-center'>404</h1>
        <h1 className='text-2xl text-gray-600 mb-4'>Go back to browsing</h1>
      
          <Link to={"/"} className='no-underline border-2 border-slate-200 rounded-lg p-2 mx-auto'> ⚡  home page</Link>
      
    </div>
  )
}

export default NotFound