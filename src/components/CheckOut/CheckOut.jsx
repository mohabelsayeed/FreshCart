import React from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { useParams } from 'react-router-dom';


export default function CheckOut(){

let {cartid} =useParams()
    
     function handleRegister(formsdata) {
     
        console.log(formsdata);
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`,
            
           {'shippingAddress': formsdata},
           {headers:{
token:localStorage.getItem('userToken')
           },
           params:{
           url:'http://localhost:5173/'
                       },
           }
        ) 
        .then((response)=>{
            console.log(response);
            location.href=response.data.session.url
            
        })
        .catch((error)=>{})
        
    }

    
    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
            
        },
        onSubmit: handleRegister
    })
    
    
    
      return (
        <>
        <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div class="bg-white shadow-md rounded-md p-6">
    
                <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
                  pay Now
                </h2>
     
                <form class="space-y-6" onSubmit={formik.handleSubmit} method="POST">
   
                    <div>
                        <label htmlFor="details" class="block text-sm font-medium text-gray-700">details</label>
                        <div class="mt-1">
                            <input name="details" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.details} id='details' type="text" autocomplete="details-address" 
                                class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </div>
                    
                    </div>
                    <div>
                        <label htmlFor="phone" class="block text-sm font-medium text-gray-700">phone</label>
                        <div class="mt-1">
                            <input name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.phone} id='password' type="tel" autocomplete="phone" 
                                class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </div>
                     
                    </div>
                    <div>
                        <label htmlFor="city" class="block city-sm font-medium text-gray-700">city</label>
                        <div class="mt-1">
                            <input name="city" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.city} id='city' type="text" autocomplete="city" 
                                class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                        </div>
                     
                    </div>
                    <div>
                        <button type="submit" 
                        class="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                        Pay Now
                       </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
        
        
        
        </>
      )
  }
  
