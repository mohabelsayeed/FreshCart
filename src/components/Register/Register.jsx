import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as Yup from 'yup';
import {UserContext} from './../../Context/UserContext'
export default function Register() {

let {setlogin}= useContext(UserContext)
let navigate = useNavigate()

const [apiErorr, setapiErorr] = useState('')
const [loading, setloading] = useState(false)

 function handleRegister(formsdata) {
    setloading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formsdata) 
    .then((response)=>{console.log( 'success' ,response)
    if (response.data.message == 'success'){
        localStorage.setItem('userToken' ,response.data.token)
        setlogin(response.data.token)
        setloading(false)
            navigate ('/login')
            }
            ;})
    .catch((error)=>
      {setloading(false)
       setapiErorr(error.response.data.message)})
}

let validationschema = Yup.object({
    name: Yup.string().required('name is required').min(3,'min lenght is 3').max(10, ' max lenght is 10'),
    email: Yup.string().required('email is required').email('enter valid email '),
    phone: Yup.string().required('phone is required').matches(/^(0[1-9][0-9]{1,2}[ -]?[0-9]{6,7}|01[0-9]{1}[ -]?[0-9]{8})$/,'phone not valid '),
    password: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password not valid '),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')])
})

let formik = useFormik({
    initialValues:{
        name: '',
        email:'',
        password:'',
        rePassword:'',
        phone:''
    },
validationSchema: validationschema
,
    onSubmit: handleRegister
})





return (
    <>
      

       <div className='mx-32 my-24'>
        <h1 className='text-gray-800 text-4xl font-medium mb-5'> register now</h1>
        {apiErorr?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apiErorr}</span> 
</div>:null
}
     <form onSubmit={formik.handleSubmit} className="space-y-6 " method="POST">
  <div>
    <label htmlFor="Name" className=" text-lg font-thin text-black">Name :</label>
    <div className="mt-1">
      <input name="name"onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow- focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
    </div>
    {formik.errors.name && formik.touched.name ? 
 <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name}</span> 
</div>:null
}

  </div>
  <div>
    <label htmlFor="Email" className="block text-lg font-thin text-black">Email :</label>
    <div className="mt-1">
      <input name="email"onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email-address" autoComplete="email-address" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
    </div>
    {formik.errors.email && formik.touched.email ? 
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div>:null
}
  </div>
  <div>
    <label htmlFor="password" className="block text-lg font-thin text-black">Password :</label>
    <div className="mt-1">
      <input name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}type="password" autoComplete="password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
    </div>
    {formik.errors.password && formik.touched.password ? 
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span>
</div>:null
}
  </div>
  <div>
    <label htmlFor="Re-password" className="block text-lg font-thin text-black">Re-password :</label>
    <div className="mt-1">
      <input name="rePassword"onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" autoComplete="Re-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
    </div>
    {formik.errors.rePassword && formik.touched.rePassword ? 
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.rePassword}</span> 
</div>:null
}
  </div>
  <div>
    <label htmlFor="Phone" className="block text-lg font-thin text-black">Phone :</label>
    <div className="mt-1">
      <input name="phone"onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" autoComplete="confirm-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
    </div>
    {formik.errors.phone && formik.touched.phone ? 
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.phone}</span> 
</div>:null
}
  </div>
  <div className=" flex justify-end ">
    <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="  rounded-md border border-transparent border-black py-2 px-4 text-lg font-medium text-gray-500 shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"> {loading ?<i className='fa fa-spinner fa-spin mx-3 '></i>:null } Register
     now
    </button>
  </div>
</form>

       </div>


          
   


    
    
    
    </>
  )


}
