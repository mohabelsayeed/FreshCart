import React from 'react'
import { useQuery } from '@tanstack/react-query';
import {Helmet} from "react-helmet";
import axios from 'axios'
import Loader from '../Loader/Loader';

export default function Brands() {


let {data, isLoading}= useQuery({queryKey:['recentBrands'],queryFn:getbrands})
console.log(data?.data);

async function getbrands(){
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then(({data})=>{return data})
    .catch(()=>{  })
    }

if(isLoading){
  return  (<Loader/>) 
}else{
  return (
    <>
   
  <h1 className='font-semibold text-4xl mt-5 pt-5 text-center text-green-500'> All Brands</h1>
    
      <div className='container mt-5'>
        <div className='row flex justify-center '>
        {data?.data?.map((brandsInfo)=>{ 
          return <div className='px-10  product  ' key={brandsInfo.id} >
            <div className='p-5 col text-center'>
            <img src={brandsInfo.image} alt={brandsInfo.name} className='px-7'></img>
            <span className='text-lg font-light text-center'> {brandsInfo.name}</span>
      
            </div>
            </div>
        }
        )}
        </div>
      </div>
    </>
  )}
 


}

