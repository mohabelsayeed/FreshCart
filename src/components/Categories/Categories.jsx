import React from 'react'
import { useQuery } from '@tanstack/react-query';
import {Helmet} from "react-helmet";
import axios from 'axios'
import Loader from '../Loader/Loader';
import module from './Categories.module.css'

export default function Categories() {


let {data, isLoading}= useQuery({queryKey:['recentCategories'],queryFn:getCategories})
console.log(data?.data);

async function getCategories(){
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{return data})
    .catch(()=>{  })
    }

if(isLoading){
  return  (<Loader/>) 
}else{
  return (
    <>
   

    
      <div className='container mt-5'>
        <div className='row flex justify-center'>
        {data?.data?.map((CategoriesInfo)=>{ 
          return <div className={`px-10  m-10 product  ${module.fit}`} key={CategoriesInfo.id} >
            <div className='p-5 text-center col'>
            <img src={CategoriesInfo.image} alt={CategoriesInfo.name} className=' border'></img>
            <span className=' font-semibold  mb-0 pt-5 text-center text-green-500'> {CategoriesInfo.name}</span>
      
            </div>
            </div>
        }
        )}
        </div>
      </div>
    </>
  )}
 


}


