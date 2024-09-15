import React, {useContext, useState } from 'react'
import {useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as Yup from 'yup';
import {UserContext} from './../../Context/UserContext'
export default function Login() {

  let navigate = useNavigate()

  let {setlogin}= useContext(UserContext)

  const [apiErorr, setapiErorr] = useState('')
  const [loading, setloading] = useState(false)
  
   function handleRegister(formsdata) {
      setloading(true)
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formsdata) 
      .then((response)=>{console.log( 'success' ,response)
      if (response.data.message == 'success'){
        localStorage.setItem('userToken' ,response.data.token)
        setlogin(response.data.token)
          setloading(false)
              navigate ('/')
              }
              ;})
      .catch((error)=>
        {setloading(false)
         setapiErorr(error.response.data.message)})
  }
  
  let validationschema = Yup.object({

      email: Yup.string().required('email is required').email('enter valid email '),
      password: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password not valid '),
      
  })
  
  let formik = useFormik({
      initialValues:{
        
          email:'',
          password:'',
          
      },
  validationSchema: validationschema
  ,
      onSubmit: handleRegister
  })
  
  
  
    return (
      <>
   
      
   <div className='mx-32 my-24'>
        <h1 className='text-gray-800 text-4xl font-medium mb-5'> login now</h1>
        {apiErorr?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apiErorr}</span> 
</div>:null
}
     <form onSubmit={formik.handleSubmit} className="space-y-6 " method="POST">

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

  <div className=" flex justify-end ">
    <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="  rounded-md border border-transparent border-black py-2 px-4 text-lg font-medium text-gray-500 shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"> {loading ?<i className='fa fa-spinner fa-spin mx-3 '></i>:null } login
     now   
     
    </button>
  </div>
  
  <Link to='/register'><span className=' ms-0'> signup</span></Link>
 <br/>
 <Link to='/ForgetPassword'><span> ForgetPassword</span></Link>
</form>

       </div>
      
      </>
    )
}






