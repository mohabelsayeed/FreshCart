import React, { useContext, useState } from 'react';
import { CartContext } from './../../Context/CartContex';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';

export default function Carts() {
  const [product, setProduct] = useState(null);
  const { isLoading } = useQuery({ queryKey: ['cart'], queryFn: getProduct });
  const { getProductTocart, UpdateProductIncart, deleteProductIncart } = useContext(CartContext);

  async function getProduct() {
    const { data } = await getProductTocart();
    setProduct(data?.data);
  }

  async function updateProduct(id, countNumber) {
    const { data } = await UpdateProductIncart(id, countNumber);
    setProduct(data?.data);
  }

  async function deleteProduct(id) {
    const { data } = await deleteProductIncart(id);
    setProduct(data?.data);
  }

  if (isLoading) {
    return <Loader />;
  } else {
    return (
  <div className="flex flex-col py-8 px-4 md:px-8 lg:px-12">
    <div className="overflow-x-auto shadow-md sm:rounded-lg my-12">
    <div className="max-w-full mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 p-4">
    <h1 className="text-center text-3xl text-main">Shopping Cart</h1>
    <p className="text-center py-3">
      Total Price: <span>{product?.totalCartPrice} EGP</span>
    </p>
  <div className="flex justify-center mb-4">
    <Link
       to={`/CheckOut/${product?._id}`}
    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >
  Checkout
  </Link>
  </div>
</div>
{product?.products?.length > 0 ? (
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
  <thead className="bg-gray-50 dark:bg-gray-700">
  <tr>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
    <span className="sr-only">Image</span>
    </th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
     Product
     </th>
      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
      Qty
    </th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
     Price
     </th>
     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
    Action
     </th>
 </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
 {product?.products.map((item) => (
 <tr key={item.product.id}>
<td className="px-4 py-2">
<img
 src={item.product.imageCover}
 className="w-16 h-16 md:w-24 md:h-24 object-cover"
 alt={item.product.title} />
  </td>
<td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
 {item?.product.title}
 </td>
<td className="px-4 py-2 text-sm">
 <div className="flex items-center">
 <button
onClick={() => updateProduct(item?.product?.id, item?.count - 1)}
 className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
 type="button" >
<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
</svg></button>
<input
 type="number"
 className="w-12 border border-gray-300 text-gray-900 text-sm rounded-lg mx-2"
 value={item?.count}
 readOnly />
<button
 onClick={() => updateProduct(item?.product?.id, item?.count + 1)}
 className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
type="button" >
  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" /> </svg>
 </button>
</div>
</td>
 <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white"> {item?.price} EGP</td>
 <td className="px-4 py-2">
<button onClick={() => deleteProduct(item?.product?.id)} className="text-red-600 hover:underline dark:text-red-500" > Remove</button>
  </td>
 </tr>
 ))}
</tbody>
</table>
 ) : (
  <h1 className="text-center text-lg text-gray-600 dark:text-gray-400">There is no data</h1>
 )}
</div>
 </div>
 );
  }
}















































