"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { toast, useToast } from "@/hooks/use-toast"
import { Textarea } from "../ui/textarea"

export default function AddCourse() {
  return (
    <section className="text-white">
    <Dialog>
      <DialogTrigger asChild>
      <button className='bg-[#016339] text-[#f8f9f8] px-4 py-2 rounded-md mt-2 border-2 border-[#126d46] hover:border-[#67b593]'>+ Add New Course </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Create a new Course </DialogTitle>
          <DialogDescription>
            Make exciting course for your community 
          </DialogDescription>
        </DialogHeader>


        {/* main Form */}
     <div>
         <CourseForm/>
     </div>


<DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>


      </DialogContent>
    </Dialog>
    </section>
  )
}


 function CourseForm(){


     const form = useForm({
       defaultValues: {
        title: "",
        description: "",
        badge_text: "",
        badge_color: "#3ccb8a", // Default to green
        instructor_name: "",
       },
     });
    const { handleSubmit } = form;
      const onSubmit = async (data) => {
       
    
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Authorization token is missing!");
          return;
        }
    
        try {
          const response = await fetch(
            "https://react-interview.crd4lc.easypanel.host/api/course",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            }
          );
    
          if (response.status) {
            toast({
                description: (
                    <div>
                         <h1>Course is created!!</h1>
                    </div>
               
                ),
              });
          } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
            alert("Failed to add course.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred.");
        }
      };

return (
    <section className="sm:max-w-[425px]">
         <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* username */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3dcd8c]">Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Next.js master class" {...field} className="text-slate-300 border-opacity-20" required/>

              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3dcd8c]">Details about your course</FormLabel>
              <FormControl>
                <Textarea placeholder="on this course you will learn.." {...field} className="text-slate-300 border-opacity-20 h-20" required />

              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="badge_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3dcd8c]">Badge text</FormLabel>
              <FormControl>
                <Input placeholder="ex. Beginner Friendly" {...field} className="text-slate-300 border-opacity-20" required/>

              </FormControl>
         
              <FormMessage />
            </FormItem>
          )}
        />
        {/* color */}
        <FormField
          control={form.control}
          name="badge_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3dcd8c]">Badge color</FormLabel>
              <FormControl>
                <Input placeholder="@sabber" type="color" {...field} className="text-slate-300 border-opacity-20 w-[120px]"/>

              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        {/* author */}
        <FormField
          control={form.control}
          name="instructor_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3dcd8c]">Instructor name</FormLabel>
              <FormControl>
                <Input placeholder="@sabber" type="text" {...field} className="text-slate-300 border-opacity-20" required/>

              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

<Button type="submit" className="w-full">+ Add course</Button>

    </form>
</Form>
    </section>

)
}
