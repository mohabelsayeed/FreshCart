import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Category from '../Category/Category';
import toast from 'react-hot-toast';
import { CartContext } from './../../Context/CartContex';

export default function Productdetails() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { addProductTocart } = useContext(CartContext);
  async function addproductItem(id) {
    try {
      const response = await addProductTocart(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
        navigate('/Carts'); 
      } else {
        toast.error(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Failed to add product to cart. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    }
  }

  const [details, setdetails] = useState(null);
  function getproductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => setdetails(data.data))
      .catch((error) => {
        toast.error('Failed to load product details. Please try again.', {
          duration: 4000,
          position: 'top-center',
        });
      });
  }

  useEffect(() => {
    getproductDetails();
  }, [id]);

  return (
    <>
      <div className="row mt-5 justify-center items-center">
        <div className='w-1/4'>
          <img src={details?.imageCover} alt={details?.title} className='w-full' />
        </div>
        <div className='w-3/4'>
          <h1 className='text-xl font-semibold text-slate-800'>{details?.title}</h1>
          <p>{details?.description}</p>
          <p className='mt-3'>{details?.category?.name}</p>

          <div className='flex justify-between'>
            <span>{details?.price} EGP</span>
            <span>{details?.ratingsQuantity} <i className='fas fa-star text-yellow-400'></i></span>
          </div>
          <button onClick={() => addproductItem(details?.id)} className='btn'>
            Add to Cart
          </button>
        </div>
      </div>

      <Category categoryName={details?.category?.name} />
    </>
  );
}

















