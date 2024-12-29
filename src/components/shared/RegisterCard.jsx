"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Link, Navigate, useNavigate } from "react-router-dom"


const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email( {
    message: "Invalid Email Address",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  })
})

export default function Register() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const {toast}= useToast()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data) {
    try {
      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        toast({
          title: "Register Success 🤖✨",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
          ),
        });
        navigate("/login")
      } else {
        const errorData = await response.json(); // Try to parse error details
        toast({
          title: "Error",
          description: errorData?.message || "An error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Network Error",
        description: "There was a problem connecting to the server.",
        variant: "destructive",
      });
    }
  }
  
  return (
    <section className="">
      <main className="flex justify-center items-center md:w-[600px] mx-auto  py-6 border-2 rounded-2xl mt-4 bg-[#1e1e1e] border-[#2e2e2e]">
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      {/* username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3dcd8c]">Username</FormLabel>
              <FormControl>
                <Input placeholder="@sabber" {...field} className="text-slate-300 border-opacity-20"/>

              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
             <FormLabel  className="text-[#3dcd8c]">Email</FormLabel>
              <FormControl>
                <Input placeholder="sabber@gmail.com" {...field} className="text-slate-300 border-opacity-20"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
             <FormLabel  className="text-[#3dcd8c]">Password</FormLabel>
              <FormControl>
                <Input type={showPassword? "text":"password"} placeholder="Enter strong password" {...field} className="text-slate-300 border-opacity-20" />
              </FormControl>
              <FormDescription>
                   <p onClick={togglePasswordVisibility} className="opacity-30 border-[1px] border-gray-600 p-1 inline-flex rounded-lg hover:opacity-50 cursor-pointer">Show password</p>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    

        <Button type="submit" className="w-full">Submit</Button>
       <div className='flex gap-2 justify-center'>
             <h3>Already have a account?</h3>
            <Link to={"/login"} className='text-[#006239] font-semibold underline '>Login</Link>
             </div>
      </form>
    </Form>
    </main>
    </section>
  )
}
