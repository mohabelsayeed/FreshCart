import React, {useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {UserContext} from './../../Context/UserContext'
import { CartContext } from '../../Context/CartContex'

export default function Navbar() {

  const [open, setopen] = useState(false)
  function toggle(){

    setopen(!open)
  }

let navigate = useNavigate()
  let {islogin, setlogin }= useContext(UserContext)

  let {cartnumber,getProductTocart}= useContext(CartContext)

  async function getProduct() {
     await getProductTocart();
  }
   
useEffect(()=>{
  getProduct()
},[])
  function logout (){
    localStorage.removeItem('userToken');
    setlogin(null);
    navigate('/login')
  }
  return (
  <>

<nav className="lg:px-16 px-4 bg-[#F8F9FA] p-4 flex flex-wrap items-center py-4 shadow-md">
<div class="flex-1 flex justify-between items-center">
    <span  className="text-black text-2xl font-medium "> <i className=" text-[#4FA74F] text-3xl fa-solid fa-cart-shopping"></i>fresh cart</span>
    </div>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <svg onClick={toggle} className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className="   md:w-auto" id="navbar-default">
        <ul className={` md:block font-medium nav flex lg:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700  ${open?'block' : 'hidden'}`}>
        {islogin?
        <>

<li><NavLink to={''} href="#">Products</NavLink></li>
<li><NavLink to={'brands'} href="#">brands</NavLink></li>
<li><NavLink to={'Categories'} href="#">categories</NavLink></li>
<li><NavLink to={'WishList'} href="#">Wish list</NavLink></li>
<li><NavLink to={'Carts'} href="#">Carts </NavLink></li>
<li className='icon2 '>
  <NavLink to={'Carts'} href="#">
    <i className=" text-[#3c3d3c] text-3xl fa-solid fa-cart-shopping" ></i>
    <span id='lblCartCount' className=" badge font-medium  ">{cartnumber}</span>
    </NavLink></li>
</>:null
}

{!islogin?
<>
 <li><NavLink to={'login'}  href="#">login</NavLink></li>
 <li><NavLink to={'register'}  href="#">register</NavLink></li>
</>:
<li className='icon '><span  onClick={()=>{logout()}}>logout</span></li>
}  
        </ul>
      
    </div>
  </nav>
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
  )
}




















































