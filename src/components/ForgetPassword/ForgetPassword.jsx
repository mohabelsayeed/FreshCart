import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
    const navigate = useNavigate();

    // Validation schema for email
    const emailValidationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Enter a valid email'),
    });

    // Validation schema for reset code
    const resetCodeValidationSchema = Yup.object({
        resetCode: Yup.string().required('Reset code is required'),
    });

    // Formik for email submission
    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: emailValidationSchema,
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
                console.log(data);
                if (data.statusMsg === 'success') {
                    document.querySelector('.forgetpassword').classList.add('hidden');
                    document.querySelector('.verfycode').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error sending the code:', error.response?.data || error.message);
           
            }
        },
    });

    // Formik for reset code verification
    const verfiyFormik = useFormik({
        initialValues: { resetCode: '' },
        validationSchema: resetCodeValidationSchema,
        onSubmit: async (values) => {
            try {
                
                const trimmedValues = { ...values, resetCode: values.resetCode.trim() };

                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', trimmedValues);
                console.log(data);
                if (data.status === 'Success') {
                    navigate('/resetPassword');
                }
            } catch (error) {
                console.error('Error verifying the code:', error.response?.data || error.message);
               
            }
        },
    });

    return (
        <>
            <div className='forgetpassword mx-10 mt-10'>
                <h3 className='font-semibold'>Forgot Password</h3>
                <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1">
                            <input
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                id='email'
                                type="email"
                                autoComplete="email"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            />
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <span className="font-medium">{formik.errors.email}</span>
                            </div>
                        )}
                    </div>
                    <button
                        disabled={!(formik.isValid && formik.dirty)}
                        type='submit'
                        className='text-green-800 my-3 bg-green-600 border rounded-md text-center'
                    >
                        Send Code
                    </button>
                </form>
            </div>

            <div className='verfycode hidden mx-10 mt-10'>
                <h3 className='font-semibold'>Verify Code</h3>
                <form onSubmit={verfiyFormik.handleSubmit} className='w-75 mx-auto my-5'>
                    <div>
                        <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">Reset Code</label>
                        <div className="mt-1">
                            <input
                                name="resetCode"
                                onChange={verfiyFormik.handleChange}
                                onBlur={verfiyFormik.handleBlur}
                                value={verfiyFormik.values.resetCode}
                                id='resetCode'
                                type="text"
                                autoComplete="text"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            />
                        </div>
                        {verfiyFormik.errors.resetCode && verfiyFormik.touched.resetCode && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <span className="font-medium">{verfiyFormik.errors.resetCode}</span>
                            </div>
                        )}
                    </div>
                    <button
                        disabled={!(verfiyFormik.isValid && verfiyFormik.dirty)}
                        type='submit'
                        className='text-green-800 my-3 bg-green-600 border rounded-md text-center'
                    >
                        Verify Code
                    </button>
                </form>
            </div>
        </>
    );
}



