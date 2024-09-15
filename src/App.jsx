import { useState } from 'react'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Carts from './components/Carts/Carts';
import CheckOut from './components/CheckOut/CheckOut';
import CartContextProvider from './Context/CartContex';
import {Toaster} from 'react-hot-toast'
import{ QueryClient , QueryClientProvider  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Allorders from './components/Allorders/Allorders';
import { Offline, Online } from "react-detect-offline";
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Categories from './components/Categories/Categories.jsx';
import WishList from './components/WishList/WishList.jsx';
import WishlistContextProvider  from './Context/WishlistContext.jsx';

let query =new QueryClient()


function App() {
let routo = createBrowserRouter([
{path:'' , element:<Layout/>, children:([
{index:true , element: <ProtectedRoute><Products/></ProtectedRoute> },
{path:'login' , element:<Login/>},
{path:'register' , element:<Register/>},
{path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
{path:'Categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
{path:'WishList' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
{path:'ForgetPassword' , element:<ForgetPassword/>},
{path:'resetPassword' , element:<ResetPassword/>},
{path:'allorders' , element:<ProtectedRoute><Allorders/></ProtectedRoute>},
{path:'CheckOut/:cartid' , element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
{path:'Carts' , element:<ProtectedRoute><Carts/></ProtectedRoute>},
{path:'ProductDetails/:id/:Category' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
{path:'*' , element:<NotFound/>}
  ])}
])

  return (
    <>
    <WishlistContextProvider>

<CartContextProvider>
<UserContextProvider>
  <QueryClientProvider client={query}>
    <ReactQueryDevtools></ReactQueryDevtools>
    <RouterProvider router={routo}></RouterProvider>
    <Offline>Only shown offline (surprise!)</Offline>
    <Toaster/>
  </QueryClientProvider>
   
   </UserContextProvider>

</CartContextProvider>
   
</WishlistContextProvider>
    
  
    
     
    </>
  )
}

export default App
