import axios from "axios";
import { createContext, useState } from "react";



let headers= {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzg5NGRmZWQwZGMwMDE2YzE0MGI4NCIsIm5hbWUiOiJNYXlhciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI0NjYzODIwLCJleHAiOjE3MzI0Mzk4MjB9.6rc8ak6QFNaHxyotH4vCjlFS0SeKpMuxrHrYGOTTMyI'}


export let WishlistContext =createContext()
export default function  WishlistContextProvider (props){
    const [WishListnumber, setWishListnumber]=useState(0)

async function addWishList (productId){
 return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:productId
    },
    {
        headers:headers
    })
    .then((response)=>{
        console.log(response);
        
    setWishListnumber(response.data.numOfCartItems)
       return response})
    .catch((error)=>error)
}

async function getWishListTocart(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        headers:headers
    })
    .then((response)=>{
        setWishListnumber(response.data.numOfCartItems)
       return response})
    .catch((error)=>error)
}


async function deleteWishItem (productId){
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        headers:headers
    })
    .then((response)=>{
        setWishListnumber(response.data.numOfCartItems)
       return response})
    .catch((error)=>error)
}

return <WishlistContext.Provider value={{addWishList , getWishListTocart , deleteWishItem,WishListnumber }}>

{props.children}
</WishlistContext.Provider>

}