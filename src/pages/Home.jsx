import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


   return (
    <div className='text-[#fafafa]'>Home</div>
  ) 
  
}

export default Home