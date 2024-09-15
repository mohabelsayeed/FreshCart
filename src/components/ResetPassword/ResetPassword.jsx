import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
let navigat =useNavigate()

async function RestPassword(values){
let{data}= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
console.log(data);
if(data.token){
    navigat('/login')
}}
        let formik= useFormik({
            initialValues:{
                email:'',
                newPassword:''
            },
            onSubmit:RestPassword
           })

  return (
    <>
    
    <form class="space-y-6" onSubmit={formik.handleSubmit} method="POST">
           
           <div>
               <label htmlFor="email" class="block text-sm font-medium text-gray-700">email</label>
               <div class="mt-1">
                   <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email} id='email' type="email" autocomplete="email" 
                       class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
               </div>
             
           </div>
           <div>
               <label  class="block text-sm font-medium text-gray-700">New Password</label>
               <div class="mt-1">
                   <input name="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.newPassword} id='newPassword' type="password"  
                       class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
               </div>
           </div>
           <button   type='submit' className='text-green-800 my-3 bg-green-600 border rounded-md text-center' >ResetPassword </button>
</form>
    
    
    </>
  )
}
