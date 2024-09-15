import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

export default function Category(props) {

  console.log(props);
  
 let category = props.categoryName;   
    
  const [product, setdetails] = useState([]);
  const [loading, setloading] = useState(true)

  function getrelatedcategory(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      setloading(false)
    let allproducts = data.data;
     let related= allproducts.filter((prod)=>{
return prod.category.name === category
})
setdetails(related)
    })
    .catch(()=>{ setloading(false)})
  }
useEffect(()=>{
    getrelatedcategory()
} ,[])
  return (
    <>
      <div className='container mt-5'>
        {!loading?
        <div className='row'>
        {product.map((productInfo)=>{ 
          return <div className='w-2/12 px-4' >
            <Link to={`/ProductDetails/${productInfo.id}/${productInfo.category.name}`}>
            <img src={productInfo.imageCover} alt={productInfo.category.name} className=''></img>
        <span className='font-light text-green-800 block'> {productInfo.category.name}</span>
        <span className='text-lg font-light'> {productInfo.title}</span>
        <div className='flex justify-between'>
          <span>{productInfo.price}</span>
          <span>{productInfo.ratingsQuantity} <i className='fas fa-star text-yellow-400'></i></span>
        </div>
            </Link> 
            </div>
        }
        )}
        </div>:
        <Loader/>
        }
      </div>
    
    </>
  )
}
