import axios from 'axios';
import React, { useContext, useState } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../../Context/CartContex';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import MainSlider from '../MainSlider/MainSlider';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import styles from './Products.module.css';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProducts, setLikedProducts] = useState(new Set());

  let { data, error, isError, isFetching, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getproduct,
  });

  let { addProductTocart } = useContext(CartContext);
  let { addWishList } = useContext(WishlistContext);

  async function addproductItem(id) {
    try {
      let response = await addProductTocart(id);
      console.log(response);

      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
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

  async function addWishListItem(id) {
    try {
      let response = await addWishList(id);
      console.log(response);

      if (response.data.status === 'success') {
        toast.success('Product added to your wishlist', {
          duration: 4000,
          position: 'top-center',
        });
      } else {
        toast.error(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Failed to add product to wishlist. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    }
  }

  async function getproduct() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => data)
      .catch(() => { });
  }

  const handleLikeToggle = (id) => {
    setLikedProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const filteredProducts = data?.data?.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (<Loader />);
  } else {
    return (
      <>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <MainSlider />
        <CategorySlider />
        <div className={styles.container}>
          <div className="mb-4 mt-14">
            <input type="text" placeholder="Search for products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-2 border rounded-lg" />
          </div>
          <div className={styles.row}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((productInfo) => (
                <div className={styles.col} key={productInfo.id}>
                  <div className={`${styles.product} ${styles['bg-slate-200']} ${styles['p-5']} ${styles['product-content']}`}>
                    <Link to={`/ProductDetails/${productInfo.id}/${productInfo.category.name}`}>
                      <img src={productInfo.imageCover} alt={productInfo.category.name} />
                      <span className={styles.category}>{productInfo.category.name}</span>
                      <span className={styles.title}>{productInfo.title}</span>
                      <div className='flex justify-between'>
                        <span className={styles.price}>{productInfo.price}</span>
                        <span className={styles.ratings}>{productInfo.ratingsQuantity} <i className='fas fa-star'></i></span>
                      </div>
                    </Link>
                    <button onClick={() => { addproductItem(productInfo.id) }} className={styles.btn}>Add to cart</button>
                    <button 
                      onClick={() => {
                        handleLikeToggle(productInfo.id);
                        addWishListItem(productInfo.id);
                      }} 
                      className='text-center'
                    >
                      <i className={`fa-solid fa-heart ${likedProducts.has(productInfo.id) ? 'text-red-600' : 'text-gray-500'}`}></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </>
    );
  }
}


























