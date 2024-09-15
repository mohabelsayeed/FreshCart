import axios from "axios";
import { createContext, useState } from "react";



let headers= {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjVjZTU4ZWQwZGMwMDE2YzFkZWU4MyIsIm5hbWUiOiJNYXlhciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzODI4MzEyLCJleHAiOjE3MzE2MDQzMTJ9.XXkVzVFkE8YOMsc1Fy0D_4SsAW3-RL8SShDQD88U9N8'}




export let CartContext =createContext()
export default function  CartContextProvider (props){
    const [cartnumber, setcartnumber]=useState(0)
    
async function addProductTocart (productId){
 return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:productId
    },
    {
        headers:headers
    })
    .then((response)=>{
        setcartnumber(response.data.numOfCartItems)
       return response})
    .catch((error)=>error)
}

async function getProductTocart (){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        headers:headers
    })
    .then((response)=>{
        setcartnumber(response.data.numOfCartItems)
       return response})
    .catch((error)=>error)
}
async function UpdateProductIncart (productId,count){
 return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        count:count
    },
    {
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
}


async function deleteProductIncart (productId){
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        headers:headers
    })
    .then((response)=>{
        setcartnumber(response.data.numOfCartItems)
       return response})
    .catch((error)=>error)
}

return <CartContext.Provider value={{addProductTocart , getProductTocart ,UpdateProductIncart, deleteProductIncart,cartnumber }}>

{props.children}
</CartContext.Provider>

}