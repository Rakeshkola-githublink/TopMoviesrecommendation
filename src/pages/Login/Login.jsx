import './Login.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        firstName: isLoginMode ? Yup.string() : Yup.string()
            .required('First Name is required')
            .min(2, 'First name must be at least 2 characters'),
        lastName: isLoginMode ? Yup.string() : Yup.string()
            .required('Last name is required')
            .min(2, 'Last name must be at least 2 characters'),
        confirmPassword: isLoginMode ? Yup.string() : Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        resetForm();

         const newUrl = `http://localhost:5700/api/user/${isLoginMode ? 'userlogin' : 'userregister'}`;
        ;

        try {
            const response = await axios.post(newUrl, values);
            
            if (response.data.success) {
               
                localStorage.setItem("token", response.data.token);
                if (!isLoginMode) setIsLoginMode(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during API call:", error);
            toast.error("An error occurred while processing your request.");
        }
    };

    return (
        <>
            
            <div className='login'>
                
                <main className='login-container'>
                <h2>Movies.com</h2>
                    <ToastContainer />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                {!isLoginMode && (
                                    <>
                                        <div className="first-name">
                                            <label htmlFor="firstName">Enter Your First Name</label>
                                            <Field type="text" id="firstName" name="firstName" placeholder='Enter Your First Name' />
                                            <ErrorMessage name="firstName" component="div" className="error" />
                                        </div>

                                        <div className="last-name">
                                            <label htmlFor="lastName">Enter Your Last Name</label>
                                            <Field type="text" id="lastName" name="lastName" placeholder='Enter Your Last Name' />
                                            <ErrorMessage name="lastName" component="div" className="error" />
                                        </div>
                                    </>
                                )}

                                <div className="email-address">
                                    <label htmlFor="email">Enter Your Email Address</label>
                                    <Field type="email" id="email" name="email" placeholder='Enter Your Email Address' />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>

                                <div className="password-input">
                                    <label htmlFor="password">Enter your Password</label>
                                    <Field type="password" id="password" name="password" placeholder='Enter Your Password' />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>

                                {!isLoginMode && (
                                    <div className="confirm-password">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm Your Password' />
                                        <ErrorMessage name="confirmPassword" component="div" className="error" />
                                    </div>
                                )}

                                <button className='login-btn' type="submit">{isLoginMode ? 'Login' : 'Register'}</button>

                                <button className='switch-page' type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
                                    {isLoginMode ? 'Switch to Registration' : 'Switch to Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </main>
            </div>
        </>
    );
};
export default Login
