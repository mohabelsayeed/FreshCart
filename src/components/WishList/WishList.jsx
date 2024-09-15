import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistContext';

export default function WishList() {
    const { getWishListTocart, deleteWishItem } = useContext(WishlistContext);
    const [product, setProduct] = useState(null);

    async function getProduct() {
        const { data } = await getWishListTocart();
        setProduct(data?.data);
    }

    async function deleteProduct(id) {
        const { data } = await deleteWishItem(id);
        setProduct(data?.data);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
 <h1 className="font-semibold text-4xl mt-5 pt-5 text-center text-green-500">My WishList</h1>
<div className="flex py-8 flex-wrap justify-center">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-12 w-full md:w-10/12 lg:w-8/12">
          {product?.products?.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                <th scope="col" className="px-4 py-3 md:px-6">
                 <span className="sr-only">Image</span> </th>
                  <th scope="col" className="px-4 py-3 md:px-6">Product</th>
                  <th scope="col" className="px-4 py-3 md:px-6">  Price</th>
                  <th scope="col" className="px-4 py-3 md:px-6">Action</th>
               </tr>
              </thead>
   <tbody>
  {product?.products.map((item) => (
   <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
         <img src={item.product.imageCover} className="w-16 md:w-24 lg:w-32 max-w-full h-auto"  alt={item.product.title} />
      </td>
       <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">  {item?.product.title}</td>
       <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white"> {item?.price} EGP  </td>
       <td className="px-4 py-2  flex mt-[88px]  items-start md:items-center">
        <button onClick={() => deleteProduct(item?.product?.id)} className=" font-medium text-red-600  dark:text-red-500 hover:underline mb-2 md:mb-0" >Remove</button>
        </td>
        <td className="px-4 py-2  flex  md:items-center">
  <Link to={`/Carts/${product?._id}`} className=" ms-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to Cart </Link>
        </td>
        
   </tr>
 ))}
 </tbody>
 </table>
 ) : (
 <h1 className="text-center text-lg text-gray-600 dark:text-gray-400">There is no data</h1> )}
</div>
 </div>
        </>
    );
}



















