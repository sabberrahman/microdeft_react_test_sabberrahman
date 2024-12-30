import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRightIcon } from 'lucide-react';
import AddCourse from '@/components/shared/AddCourse';



function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return; 
    }

    async function getData() {
      try {
        const response = await axios.get("https://react-interview.crd4lc.easypanel.host/api/course",{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
       console.log(response.data.data.data)
       setCourses(response.data.data.data)
        if (!response.status) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
 
         console.log(courses)
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }

    getData();
  }, [navigate]);

   return (
    <section className='py-[72px] px-12 bricolage'>
    <div className='text-[#fafafa] text-center'>
      <h1 className='text-5xl md:text-6xl text-[#fbfafb]'>Skill Up in Days</h1>
      <h1 className='text-4xl md:text-5xl text-[#3fcf8f]'>Thrive for Years</h1>
      <p className='text-slate-300/60 w-[250px] md:w-[360px] mx-auto text-sm md:text-md mt-4'>Step into the future with cutting-edge courses that prepare you for success. Learn, grow, and lead in your industry like never before.</p>
    <AddCourse/>
    </div>

    {/* Courses */}
    <div className='md:grid md:grid-cols-2 lg:grid-cols-3 mt-8  px-10 max-w-[1200px] mx-auto '>
    {courses.map((course)=>(

      <div key={course.id}>
      <div  className='text-white border-[1.5px] border-[#2e2f2f]/40 rounded-md p-2 mb-2 md:mb-2 bg-[#161617] md:w-[260px] xl:w-[340px] hover:border-[#2e2f2f] group cursor-pointer w-[250px]'>
        
        <div className='relative border-b border-gray-700/60'>
          {/* images + color */}
          <img src={course.image} alt={course.title}  className='w-full h-[100px] object-cover'/>
          <span className={`absolute top-0 opacity-55 text-black rounded-xl p-1`} style={{backgroundColor: course.badge_color}} >{course.badge_text}</span>
        </div>

        <div className=' p-2 border-b border-gray-700/60'>
          {/* title + descrip */}
          <h1 className='text-xl'>{course.title}</h1>
          <h3 className='text-sm opacity-35 line-clamp-2'>{course.description}</h3>
        </div>

        <div className=' flex justify-between p-2 border-b border-gray-700/60 '>
          {/* author + time  */}
          <h1 className='text-sm opacity-80'>@{course.author.name}</h1>
          <h1 className='text-xs md:text-sm opacity-30'>{course.created_at}</h1>
        </div>

        <div className='flex justify-center items-center text-sm mt-1 opacity-60 '>
          <h1>View course</h1>
          <ArrowUpRightIcon className='w-4 h-4 group-hover:animate-bounce'/>
        </div>

      </div>
      </div>
    ))}
  </div>
    </section>
  ) 
  
}

export default Home